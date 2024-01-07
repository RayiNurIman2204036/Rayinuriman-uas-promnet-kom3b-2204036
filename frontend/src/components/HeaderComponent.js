import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                      <Navbar className="bg-body-tertiary">
                            <Container>
                                <Navbar.Brand href="/reports">
                                    <img
                                    src={require('./logo.png')}
                                    width="auto"
                                    height="35"

                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                    />
                                </Navbar.Brand>
                                </Container>
                            </Navbar>
                        </div>
        )
    }
}

export default HeaderComponent
