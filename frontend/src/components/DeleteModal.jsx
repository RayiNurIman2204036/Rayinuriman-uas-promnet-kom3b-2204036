import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListReportComponent from "./ListReportComponent";

function DeleteModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button style={{marginLeft: "6px",}}
                          onClick={handleShow} 
                             className="btn btn-secondary">Delete 
                                 </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ListReportComponent.deleteReport(report.id)}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;