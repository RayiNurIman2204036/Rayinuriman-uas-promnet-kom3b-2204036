import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} 
      from 'react-router-dom'
import ListReportComponent from './components/ListReportComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateReportComponent from './components/CreateReportComponent';
import ViewReportComponent from './components/ViewReportComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component =
                              {ListReportComponent}></Route>
                          <Route path = "/reports" component = 
                              {ListReportComponent}></Route>
                          <Route path = "/add-report/:id" component = 
                              {CreateReportComponent}></Route>
                          <Route path = "/view-report/:id" component = 
                              {ViewReportComponent}></Route>
                         </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
