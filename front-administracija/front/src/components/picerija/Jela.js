import React from "react";
import { Table, Button, Form, ButtonGroup } from "react-bootstrap";

import PicerijaAxios from "../../apis/PicerijaAxios";

class Jela extends React.Component {
  constructor(props) {
    super(props);

    let jelo = {
      // default vrednosti od nesto (kao dto klasa)
      naziv: ""
    };

    let cena = {
      velicina: "",
      cena: 0.00
    }

    this.state = {
      //sve sto se koristi na ovoj stranici kao stanje 
      jelo: jelo,
      cena: cena,
      jela: [],
      cene: [],
      search: { nazivJela: "", nazivCene: "" },
      pageNum: 0,
      totalPages: 1,
    };
  }

  componentDidMount() {
  // dobavlja sve iz baze sto treba
    this.getData();
  }

  async getData() {
    await this.getCene();
    await this.getJela();
  }

  async getJela(page = null) {
    // u config se ubacuju vrednosti koje ce se koristiti za pretragu na backu, ako nista nije uneto u search na frontu na backu ce biti default vrednosti
    let config = { params: {} };

    //ifovi su ako se trazi preko pretrage, ako nije onda se koriste default vrednosti

    if (this.state.search.nazivJela != "") {
      config.params.nazivJela = this.state.search.nazivJela;
    }

    if (this.state.search.nazivCene != "") {
      config.params.nazivCene = this.state.search.nazivCene;
    }

    if (page != null) {
      config.params.pageNum = page;
    } else {
      config.params.pageNum = this.state.pageNum;
    }

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
    //kao i dobavljanje za glavnu klasu samo sto ovde nema pretrage
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

  goToEdit(nestoId) {
    //gura na stranicu za edit, prima nestoId po kom ce naci taj entitet na backu
    this.props.history.push("/nesto/edit/" + nestoId);
  }

  async doAdd() {
    //dodaje nov entitet http metodom post, salje entitet koji ima atribute dto klase na backu
    try {
      await PicerijaAxios.post("/jela/", this.state.jelo);

      //kad posalje vraca state na default stanje(AKO NE GRESIM) i opet dobavlja sve entitete klase zajedno sa dodatom
      let jelo = {
        naziv: ""
      };

      this.setState({ jelo: jelo });

      this.getJela();
    } catch (error) {
      alert("Nije uspelo dodavanje.");
    }
  }

  async doDelete(jeloId) {
    //brise entitet sa primljenim id-em http metodom delete i dobavlja opet sve entitete bez obrisanog
    try {
      await PicerijaAxios.delete("/jelo/" + jeloId);
      this.getJela();
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

    let jelo = this.state.jelo;
    jelo[name] = value;

    this.setState({ jelo: jelo });
  }

  searchValueInputChange(event) {
    //poprilicno slicna metoda kao addValue... osim sto ne menja entitet na stanju nego parametre pretrage koji se prosledjuju metodi doSearch pa na osnovu njih radi pretragu
    let control = event.target;

    let name = control.name;
    let value = control.value;

    let search = this.state.search;
    search[name] = value;

    this.setState({ search: search });
  }

  doSearch() {
    this.setState({ totalPages: 1, pageNum: 0 });
    //ako se ne varam prosledjuje nulu kad poseban parametar da bi back znao kako da se ponasa(treba da bude razlicito od null... ali nisam siguran)
    this.getJela(0);
  }

  async prelazak(id) {
    //metoda za menjanje stanja(u zadatku sa sprintovima (nov, u toku, zavrsen) pa se koristi http metoda post za izmenu postojeceg entiteta) pa se ponovo uzimaju svi entiteti sa promenjenim
    try {
      await PicerijaAxios.post(`/nesto/${id}/prelazak`);
      this.getNesto();
    } catch (error) {
      alert("Nije moguće promeniti stanje.");
    }
  }

  // changePage(direction) {
  //   //metoda za promenu stranice prima 1 i -1 da zna da li stranica ispred ili stranica iza treba da se dobavi
  //   let page = this.state.pageNum + direction;
  //   this.getNesto(page);
  //   this.setState({ pageNum: page });
  //   //this.setState({pageNum: page}, this.getZadaci);
  // }

  render() {
    return (
      <div>
        <h1>Jela</h1>

        <Form>
          <Form.Group>
            <Form.Label>Naziv</Form.Label>
            <Form.Control
              onChange={(event) => this.addValueInputChange(event)}
              name="naziv"
              value={this.state.jelo.naziv}
              as="input"
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={() => this.doAdd()}>
            Dodaj
          </Button>
        </Form>

        <Form style={{marginTop:35}}>
          <Form.Group>
            <Form.Label>Naziv jela</Form.Label>
            <Form.Control
              value={this.state.search.nazivJela}
              name="nazivJela"
              as="input"
              onChange={(e) => this.searchValueInputChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Cena</Form.Label>
            <Form.Control
              onChange={(event) => this.searchValueInputChange(event)}
              name="nazivCene"
              value={this.state.search.nazivCene}
              as="select"
            >
              <option value={-1}></option>
              {this.state.cene.map((cena) => {
                return (
                  <option value={cena.id} key={cena.id}>
                    {cena.velicina} {cena.cena}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button onClick={() => this.doSearch()}>Pretraga</Button>
        </Form>

        <ButtonGroup style={{ marginTop: 25 }}>
          <Button
            disabled={this.state.pageNum == 0}
            onClick={() => this.changePage(-1)}
          >
            Prethodna
          </Button>
          <Button
            disabled={this.state.pageNum + 1 == this.state.totalPages}
            onClick={() => this.changePage(1)}
          >
            Sledeća
          </Button>
        </ButtonGroup>

        <Table bordered striped style={{ marginTop: 5 }}>
          <thead className="thead-dark">
            <tr>
              <th>Jelo</th>
              <th>Velicine</th>
              <th>Cene</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.jela.map((jelo) => {
              return (
                <tr key={jelo.id}>
                  <td>{jelo.naziv}</td>
                  <td>{this.state.cene.map((cena)=> {
                    return (
                      <p>                   
                        {cena.velicina}  
                      </p>                   
                    )
                  })}</td>
                  <td>{this.state.cene.map((cena)=> {
                    return (
                      <p>                   
                        {cena.cena}  
                      </p>                   
                    )
                  })}</td>
                  <td>
                    {/* <Button
                      disabled={jelo.stanjeId === 3}
                      variant="info"
                      onClick={() => this.prelazak(zadatak.id)}
                    >
                      Prelazak
                    </Button> */}

                    <Button
                      variant="warning"
                      onClick={() => this.goToEdit(jelo.id)}
                      style={{ marginLeft: 5 }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => this.doDelete(jelo.id)}
                      style={{ marginLeft: 5 }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Jela;
