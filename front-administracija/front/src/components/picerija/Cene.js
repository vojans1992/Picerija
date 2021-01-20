import React from "react";
import { Table, Button, Form, ButtonGroup } from "react-bootstrap";

import PicerijaAxios from "../../apis/PicerijaAxios";

class Cene extends React.Component {
    constructor(props) {
        super(props);
    
        let jelo = {
          // default vrednosti od nesto (kao dto klasa)
          naziv: "",
          cene: []
        };
    
        let cena = {
          velicina: "",
          cena: 0.00,
          jeloId: -1
        }
    
        this.state = {
          //sve sto se koristi na ovoj stranici kao stanje
          jeloId: -1, 
          jelo: jelo,
          cena: cena,
          jela: [],
          cene: []
        };
      }

      componentDidMount() {
          this.getData();
        }

        async getData() {
          await this.getCene();
          await this.getJela();
        }

        async getJelo(jeloId){
            try {
                let result = await PicerijaAxios.get("/jela/" + jeloId);
                if (result && result.status === 200) {
                    this.setState({
                        jelo: result.data
                    })
                }
            } catch (error) {
                alert("Nije uspelo dobavljanje")
            }
        }

        async getJela(page = null) {
          let config = { params: {} };

          config.params.pageNum = page;
      
          try {
            let result = await PicerijaAxios.get("/jela", config);
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
          try {
            let result = await PicerijaAxios.get("/cene");
            if (result && result.status === 200) {
              this.setState({
                cene: result.data,
              });
            }
          } catch (error) {
            alert("Nije uspelo dobavljanje.");
          }
        }

        async doAdd() {
          //dodaje nov entitet http metodom post, salje entitet koji ima atribute dto klase na backu
          console.log(this.state.cena)
          try {
            await PicerijaAxios.post("/cene/", this.state.cena);
      
            //kad posalje vraca state na default stanje(AKO NE GRESIM) i opet dobavlja sve entitete klase zajedno sa dodatom
            let cena = {
              velicina: "",
              cena: 0.00,
              jeloId: -1
            };
      
            this.setState({ cena: cena });
      
            this.getCene();
          } catch (error) {
            alert("Nije uspelo dodavanje.");
          }
        }

        async doDelete(cenaId) {
          //brise entitet sa primljenim id-em http metodom delete i dobavlja opet sve entitete bez obrisanog
          try {
            console.log(cenaId)
            await PicerijaAxios.delete("/cene/" + cenaId);
            this.getCene();
          } catch (error) {
            alert("Nije uspelo brisanje.");
          }
        }

        addValueInputChange(event) {
          //metoda koja menja stanje entiteta na state-u da bi taj entitet mogao da se salje na back za post(verovatno i put). prima event od forme u koju korisnik upisuje podatke
          //kako se nesto upise tako se metodom onChange menja stanje na state-u
          let control = event.target;
      
          let name = control.name;
          let value = control.value;
      
          let cena = this.state.cena;
          cena[name] = value;
      
          this.setState({ cena: cena });
        }

        searchValueInputChange(event) {
            let control = event.target;
            
            let jeloId = control.value;

            this.setState({jeloId: jeloId})

            this.getJelo(jeloId);
        }

        render() {
            return (
                <div>
                    <h1>Cene i Velicine</h1>

                    <Form>
                        <Form.Group>
                            <Form.Label>Velicina</Form.Label>
                            <Form.Control
                            onChange={(event) => this.addValueInputChange(event)}
                            name="velicina"
                            value={this.state.cena.velicina}
                            as="input"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cena</Form.Label>
                            <Form.Control
                            onChange={(event) => this.addValueInputChange(event)}
                            name="cena"
                            value={this.state.cena.cena}
                            as="input"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jelo</Form.Label>
                            <Form.Control
                            onChange={(event) => this.addValueInputChange(event)}
                            name="jeloId"
                            value={this.state.cena.jeloId}
                            as="select"
                            >
                                <option value={-1}></option>
                                {this.state.jela.map((jelo) => {
                                    return (
                                        <option value={jelo.id} key={jelo.id}>
                                            {jelo.naziv}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={() => this.doAdd()}>
                            Dodaj
                        </Button>
                    </Form>

                    <Form style={{marginTop:35}}>
                        <Form.Group>
                            <Form.Label>Naziv jela</Form.Label>
                            <Form.Control
                            value={this.state.jeloId}
                            name="jeloId"
                            as="select"
                            onChange={(e) => this.searchValueInputChange(e)}
                            >
                                <option value={-1}></option>
                                {this.state.jela.map((jelo) => {
                                    return (
                                        <option value={jelo.id} key={jelo.id}>
                                            {jelo.naziv}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form>

                    <Table bordered striped style={{ marginTop: 5 }}>
                        <thead className="thead-dark">
                            <tr>
                                <th>Velicina</th>
                                <th>Cena</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.jelo.cene.map((cena) => {
                                return (
                                    <tr key={cena.id}>
                                        <td>{cena.velicina}</td>
                                        <td>{cena.cena}</td>
                                        <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => this.doDelete(cena.id)}
                                            style={{ marginLeft: 5 }}
                                            >
                                            Delete
                                        </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>


                </div>
            )
        }
}

export default Cene;