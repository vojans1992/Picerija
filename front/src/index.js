import React, {useState} from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Link,
  HashRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { Container, Navbar, Nav, Button, Form, Text, Collapse, Tooltip, Modal,Table, Col} from "react-bootstrap";
import Login from "./components/authentication/Login";
import { logout } from "./services/auth";
import posna from 'C:/Users/Boki/Desktop/picagit/Picerija/front/src/slike/posna.jpg'
import ModalPoruci from "./components/zadaci/Modal"
import modalPrviSlika from 'C:/Users/Boki/Desktop/picagit/Picerija/front/src/slike/drvo2.jpeg'
import pozadina from 'C:/Users/Boki/Desktop/picagit/Picerija/front/src/slike/belodrvo.jpeg'
var sectionStyle = {
  backgroundImage: `url(${modalPrviSlika})`
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showKorpa: false,
      jelo: {
        naziv: "",
        velicina: "",
        cena: ""
      },
      podaci:{
        ulica: "",
        broj: "",
        naselje: "",
        telefon: "",
      },
      jeloKorpa:{

      },
      korpa:[]
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowKorpa = this.handleShowKorpa.bind(this);
    this.handleCloseKorpa = this.handleCloseKorpa.bind(this);
  }

  componentDidMount(){
  }

  handleShow() {
    this.setState({show: true});
  }
  handleClose() {
    this.setState({show:false});
  }


  handleShowKorpa() {
    this.setState({showKorpa: true});
    console.log(Home.state.korpa)
  }

  handleCloseKorpa() {
    this.setState({showKorpa:false});
  }

  addValueInputChange(event) {
    let control = event.target;

    let name = control.name;
    let value = control.value;

    let podaci = this.state.podaci;
    podaci[name] = value;

    this.setState({ podaci: podaci });
  }


  sacuvajPodatke(){
    this.handleClose()
  }
  render() {
    let token = window.localStorage.getItem("token");

   // if (token) {
      return (
        <div>
          <Router >
            <Navbar bg="narandzasta" variant="warning" expand sticky="top" >
              <Navbar.Brand as={Link} to="/">
                Al Tuo Posto
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link  href="https://www.instagram.com/picerija_al.tuo.posto/">
                  Instagram
                </Nav.Link>
                <Nav.Link href="https://www.facebook.com/Pizza-Al-tuo-posto-104567764683266">
                  Facebook
                </Nav.Link>
              </Nav>
              <Button variant="primary"
                onClick={this.handleShow}
              >
                Adresa
              </Button>
              <Button variant="primary"
                onClick={this.handleShowKorpa}
              >
                Korpa
              </Button>
            </Navbar>
            <>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton style={sectionStyle}>
                <Modal.Title>Podaci o adresi</Modal.Title>
                </Modal.Header>
                <Modal.Body style={sectionStyle}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Ulica i broj</Form.Label>
                      <Form.Control placeholder="Zeleznicka" style={sectionStyle}
                      onChange={(event) => this.addValueInputChange(event)}
                      name="ulica"
                      value={this.state.podaci.ulica}
                      as="input"
                      ></Form.Control>
                      <Form.Control placeholder="14." style={sectionStyle}
                      onChange={(event) => this.addValueInputChange(event)}
                      name="broj"
                      value={this.state.podaci.broj}
                      as="input"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Naselje</Form.Label>
                      <Form.Control placeholder="Centar" style={sectionStyle}
                      onChange={(event) => this.addValueInputChange(event)}
                      name="naselje"
                      value={this.state.podaci.naselje}
                      as="input"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Broj telefona</Form.Label>
                      <Form.Control placeholder="0612443654" style={sectionStyle}
                      onChange={(event) => this.addValueInputChange(event)}
                      name="telefon"
                      value={this.state.podaci.telefon}
                      as="input"
                      ></Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={() => this.sacuvajPodatke()}>
                      Sacuvaj
                    </Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer style={sectionStyle}>
                </Modal.Footer>
              </Modal>
            </>
            <>
              <Modal show={this.state.showKorpa} onHide={this.handleCloseKorpa}>
                <Modal.Header closeButton>
                <Modal.Title>Korpa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Table as={Col}>
                      <thead className="thead-light">
                        <tr>
                          <th>Naziv</th>
                          <th>Velicina</th>
                          <th>Cena</th>
                        </tr>
                      </thead>
                      <tbody>

                        {/* {this.state.korpa.cene.map((korpa) => {
                          return(
                            <tr key={korpa.id}>
                              <td>{korpa.naziv}</td>
                              <td>{korpa.velicina}</td>
                              <td>{korpa.cena}</td>
                            </tr>
                          )
                        })} */}
                      </tbody>
                    </Table>
                    <Button variant="primary" onClick={() => this.sacuvajPodatke()}>
                      Sacuvaj
                    </Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
              </Modal>
            </>

            <Container style={{marginTop:25}}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/komponente" component={ModalPoruci} />
                <Route exact path="/login">
                  <Redirect to="/"></Redirect>
                </Route>
                <Route component={NotFound} />
              </Switch>
            </Container>
            <Navbar bg="narandzasta" variant="warning" expand fixed="bottom" sticky="bottom">
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text variant="outline-info" >Broj telefona: 061/2007604</Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
          </Router>
        </div>
      );
   // } else {
      return (
        <Router>
          <Container>
            <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route path="/">
                <Redirect to="/login"></Redirect>
              </Route>
            </Switch>
          </Container>
        </Router>
      );
    //}
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

export default App;
