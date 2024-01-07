package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/reports",
		GetReports).Methods("GET")
	router.HandleFunc("/reports",
		CreateReport).Methods("POST")
	router.HandleFunc("/reports/{id}",
		GetReport).Methods("GET")
	router.HandleFunc("/reports/{id}",
		UpdateReport).Methods("PUT")
	router.HandleFunc("/reports/{id}",
		DeleteReport).Methods("DELETE")
	http.ListenAndServe(":9080",
		&CORSRouterDecorator{router})
}

/***************************************************/

// Get all reports
func GetReports(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var reports []Report

	result, err := db.Query("SELECT id," +
		"date,description,amount,status,receiver,jk,no_telp,address from transaksi_keuanganrayinuriman")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var report Report
		err := result.Scan(&report.ID, &report.DATE,
			&report.DESCRIPTION, &report.AMOUNT, &report.STATUS, &report.RECEIVER, &report.JK, &report.NP, &report.ADDRESS)
		if err != nil {
			panic(err.Error())
		}
		reports = append(reports, report)
	}
	json.NewEncoder(w).Encode(reports)
}

// Create report
func CreateReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO transaksi_keuanganrayinuriman(date," +
		"description, amount, status, receiver, jk, no_telp, address) VALUES(?,?,?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	date := keyVal["date"]
	description := keyVal["description"]
	amount := keyVal["amount"]
	status := keyVal["status"]
	receiver := keyVal["receiver"]
	jk := keyVal["jk"]
	no_telp := keyVal["no_telp"]
	address := keyVal["address"]
	// print jenis_kelamin
	fmt.Println()
	_, err = stmt.Exec(date, description, amount, status, receiver, jk, no_telp, address)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New report was created")
}

// Get report by ID
func GetReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id,"+
		"date,description,amount,status,receiver,jk,no_telp,address from transaksi_keuanganrayinuriman WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var report Report
	for result.Next() {
		err := result.Scan(&report.ID, &report.DATE,
			&report.DESCRIPTION, &report.AMOUNT, &report.STATUS, &report.RECEIVER, &report.JK, &report.NP, &report.ADDRESS)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(report)
}

// Update report
func UpdateReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE transaksi_keuanganrayinuriman SET date = ?," +
		"description = ?, amount = ?, status = ?, receiver = ?, jk = ?, no_telp = ?, address = ? WHERE id = ?")

	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	date := keyVal["date"]
	description := keyVal["description"]
	amount := keyVal["amount"]
	status := keyVal["status"]
	receiver := keyVal["receiver"]
	jk := keyVal["jk"]
	no_telp := keyVal["no_telp"]
	address := keyVal["address"]
	_, err = stmt.Exec(date, description, amount, status, receiver, jk, no_telp, address, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Report with ID = %s was updated",
		params["id"])
}

func DeleteReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	// stmt, err := db.Prepare("DELETE FROM reports WHERE id = ?")
	stmt, err := db.Prepare("DELETE FROM transaksi_keuanganrayinuriman WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Report with ID = %s was deleted",
		params["id"])
}

type Report struct {
	ID          string `json:"id"`
	DATE        string `json:"date"`
	DESCRIPTION string `json:"description"`
	AMOUNT      string `json:"amount"`
	STATUS      string `json:"status"`
	RECEIVER    string `json:"receiver"`
	JK          string `json:"jk"`
	NP          string `json:"no_telp"`
	ADDRESS     string `json:"address"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2204036_rayinuriman_uas_pilkomb")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
