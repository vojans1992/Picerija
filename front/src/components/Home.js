import React from 'react'
import {Container, Row, Col, Image, Tooltip, Overlay, OverlayTrigger, Modal, Button, Form} from 'react-bootstrap'
import posna from 'C:/Users/Boki/Desktop/picagit/Picerija/front/src/slike/posna.jpg'
import kapricoza from 'C:/Users/Boki/Desktop/picagit/Picerija/front/src/slike/kapricoza.jpg'
import madjarica from 'C:/Users/Boki/Desktop/picagit/Picerija/front/src/slike/madjarica.jpg'
import pozadina from 'C:/Users/Boki/Desktop/picagit/Picerija/front/src/slike/belodrvo.jpeg'
import SprintsAxios from 'C:/Users/Boki/Desktop/picagit/Picerija/front/src/apis/SprintsAxios'
import App from 'C:/Users/Boki/Desktop/picagit/Picerija/front/src/index'

var sectionStyle = {
  backgroundImage: `url(${pozadina})`
}

const kapricozaTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    <h5>Kapricoza</h5>
    <p>Sastojci: Sir,Sunka,Sampinjoni</p>
  </Tooltip>
);
const posnaTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    <h5>Posna pizza</h5>
    <p>Sastojci: posni sir, kukuruz, crveni luk</p>
  </Tooltip>
);
const madjaricaTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    <h5>Madjarica</h5>
    <p>Sastojci: Sir, Sunka, Kulen, Sampinjoni</p>
  </Tooltip>
);



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jelo: {
        cena: {}
      },
      korpa:[],
      jela: [],
      cene: []
    };
  }

  dodajUKorpu(jelo){
    
    this.state.korpa.push(jelo)
    console.log(this.state.korpa)
  }

  componentDidMount(){
    console.log(this.state.jelo)
    this.getData();
  }

  async getData() {
    await this.getJela();
    await this.getCene();
  }

  async getJela(page = null) {
    let config = { params: {} };

    config.params.pageNum = page;

    try {
      let result = await SprintsAxios.get("/jela", config);
      if (result && result.status === 200) {
        this.setState({
          jela: result.data,
          totalPages: result.headers["total-pages"],
        });
      }
    } catch (error) {
      alert("Nije uspelo dobavljanje.");
    }
  }

  async getCene() {
    //kao i dobavljanje za glavnu klasu samo sto ovde nema pretrage
    try {
      let result = await SprintsAxios.get("/cene");
      if (result && result.status === 200) {
        this.setState({
          cene: result.data,
        });
      }
    } catch (error) {
      alert("Nije uspelo dobavljanje.");
    }
  }


  addValueInputChange(event) {
    let control = event.target;

    let name = control.name;
    let value = control.value;

    let jelo = this.state.jelo;
    jelo[name] = value;

    console.log(jelo)
    this.setState({ jelo: jelo });
  }

  render() {
    return (
      <div>
      <Container fluid>
          <Row>
            {this.state.jela.map((jelo) => {
              return (
                <Col as="Image">
                  <Image fluid src={jelo.slika}></Image>
                    <Form.Group>
                      <Form.Control style={sectionStyle}
                        onChange={(event) => this.addValueInputChange(event)}
                        id={jelo.id}
                        name="cena"
                        as="select"
                        >
                        <option value={-1}></option>
                        {jelo.cene.map((cena) => {
                          return(
                            <option value={cena}>{cena.velicina} cena:{cena.cena}</option>
                          )
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Button 
                      onClick={() => this.dodajUKorpu(this.state.jelo)}
                      >
                      Dodaj u korpu
                    </Button>
                </Col>
        )
      })}
        </Row>
        {/* <Row>
          <Col xs={4} as="Image" >
            <OverlayTrigger
            placement="right"
            delay={{ show: 0, hide: 0 }}
            overlay={posnaTooltip}
            >
            <Image fluid src={posna}></Image>
            </OverlayTrigger>
            <Form.Group>
              <Form.Control style={sectionStyle}
              onChange={(event) => this.addValueInputChange(event)}
              id="posna"
              name="velicina"
              as="select"
              >
                <option value={-1}></option>
                <option value={"mala"}>32cm 300din</option>
                <option value={"srednja"}>52cm 600din</option>
                <option value={"velika"}>72cm 900din</option>
              </Form.Control>
            </Form.Group>
            <Button 
              onClick={() => this.dodajUKorpu()}
            >
              Dodaj u korpu
            </Button>
          </Col>
          <Col xs={4} as="Image">
            <OverlayTrigger
            placement="right"
            delay={{ show: 0, hide: 0 }}
            overlay={kapricozaTooltip}
            >
            <Image fluid src={kapricoza}></Image>
            </OverlayTrigger>
          <Form.Group>
              <Form.Control style={sectionStyle}
              onChange={(event) => this.addValueInputChange(event)}
              id="kapricoza"
              name="velicina"
              as="select"
              >
                <option value={-1}></option>
                <option value={"mala"}>32cm 250din</option>
                <option value={"srednja"}>52cm 500din</option>
                <option value={"velika"}>72cm 750din</option>
              </Form.Control>
            </Form.Group>
            <Button 
              onClick={() => this.dodajUKorpu()}
            >
              Dodaj u korpu
            </Button>
          </Col>
          <Col xs={4} as="Image">
            <OverlayTrigger
            placement="right"
            delay={{ show: 0, hide: 0 }}
            overlay={madjaricaTooltip}
            >
            <Image fluid src={madjarica}></Image>
            </OverlayTrigger>
          <Form.Group>
              <Form.Control style={sectionStyle}
                onChange={(event) => this.addValueInputChange(event)}
                id="madjarica"
                name="velicina"
                as="select"
              >
                <option value={-1}></option>
                <option value={"mala"}>32cm 350din</option>
                <option value={"srednja"}>52cm 700din</option>
                <option value={"velika"}>72cm 950din</option>
              </Form.Control>
            </Form.Group>
            <Button
              onClick={() => this.dodajUKorpu()}
            >
                Dodaj u korpu
            </Button>
            </Col>
        </Row> */}
        {/* <Row>
          <Col >
            Kapricoza
            <Image src={kapricoza}></Image>
          </Col>
        </Row>
        <Row>
          <Col align="center">
            Madjarica
            <Image src={madjarica}></Image>
          </Col>
        </Row> */}
        
      </Container>
      </div>
    )
  }
}

export default Home;