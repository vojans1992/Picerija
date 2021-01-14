import React from "react";
import { Table, Button, Form, ButtonGroup } from "react-bootstrap";

import SprintsAxios from "../../apis/SprintsAxios";

class Nesto extends React.Component {
  constructor(props) {
    super(props);

    let nesto = {
      // default vrednosti od nesto (kao dto klasa)
      ime: "",
      zaduzeni: "",
      bodovi: 0,
      sprintId: -1,
    };

    this.state = {
      //sve sto se koristi na ovoj stranici kao stanje 
      nesto: nesto,
      nesto: [],
      nestoSaCimJePovezanoUBazi: [],
      search: { imeNesto: "", idNestoSaCimJePovezanoUBazi: -1 },
      pageNum: 0,
      totalPages: 1,
    };
  }

  componentDidMount() {
  // dobavlja sve iz baze sto treba
    this.getData();
  }

  async getData() {
    await this.getNestoSaCimJePovezanoUBazi();
    await this.getNesto();
  }

  async getNesto(page = null) {
    // u config se ubacuju vrednosti koje ce se koristiti za pretragu na backu, ako nista nije uneto u search na frontu na backu ce biti default vrednosti
    let config = { params: {} };

    //ifovi su ako se trazi preko pretrage, ako nije onda se koriste default vrednosti

    if (this.state.search.imeNestoa != "") {
      config.params.imeNestoa = this.state.search.imeNestoa;
    }

    if (this.state.search.idNestoSaCimJePovezanoUBazi != -1) {
      config.params.idNestoSaCimJePovezanoUBazi = this.state.search.idNestoSaCimJePovezanoUBazi;
    }

    if (page != null) {
      config.params.pageNum = page;
    } else {
      config.params.pageNum = this.state.pageNum;
    }

    try {
      let result = await SprintsAxios.get("/nesto", config);
      if (result && result.status === 200) {
        this.setState({
          nesto: result.data,
          totalPages: result.headers["total-pages"],
        });
      }
    } catch (error) {
      alert("Nije uspelo dobavljanje.");
    }
  }

  async getNestoSaCimJePovezanoUBazi() {
    //kao i dobavljanje za glavnu klasu samo sto ovde nema pretrage
    try {
      let result = await SprintsAxios.get("/nestoSaCimJePovezanoUBazi");
      if (result && result.status === 200) {
        this.setState({
          nestoSaCimJePovezanoUBazi: result.data,
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
      await SprintsAxios.post("/nesto/", this.state.nesto);

      //kad posalje vraca state na default stanje(AKO NE GRESIM) i opet dobavlja sve entitete klase zajedno sa dodatom
      let nesto = {
        ime: "",
        zaduzeni: "",
        bodovi: 0,
        sprintId: -1,
      };

      this.setState({ nesto: nesto });

      this.getNesto();
    } catch (error) {
      alert("Nije uspelo dodavanje.");
    }
  }

  async doDelete(nestoId) {
    //brise entitet sa primljenim id-em http metodom delete i dobavlja opet sve entitete bez obrisanog
    try {
      await SprintsAxios.delete("/nesto/" + nestoId);
      this.getNesto();
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

    let nesto = this.state.nesto;
    nesto[name] = value;

    this.setState({ nesto: nesto });
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
    this.getNesto(0);
  }

  async prelazak(id) {
    //metoda za menjanje stanja(u zadatku sa sprintovima (nov, u toku, zavrsen) pa se koristi http metoda post za izmenu postojeceg entiteta) pa se ponovo uzimaju svi entiteti sa promenjenim
    try {
      await SprintsAxios.post(`/nesto/${id}/prelazak`);
      this.getNesto();
    } catch (error) {
      alert("Nije moguće promeniti stanje.");
    }
  }

  changePage(direction) {
    //metoda za promenu stranice prima 1 i -1 da zna da li stranica ispred ili stranica iza treba da se dobavi
    let page = this.state.pageNum + direction;
    this.getNesto(page);
    this.setState({ pageNum: page });
    //this.setState({pageNum: page}, this.getZadaci);
  }

  render() {
    return (
      <div>
        <h1>Nesto</h1>

        <Form>
          <Form.Group>
            <Form.Label>Ime</Form.Label>
            <Form.Control
              onChange={(event) => this.addValueInputChange(event)}
              name="ime"
              value={this.state.zadatak.ime}
              as="input"
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Zaduženi</Form.Label>
            <Form.Control
              onChange={(event) => this.addValueInputChange(event)}
              name="zaduzeni"
              value={this.state.zadatak.zaduzeni}
              as="input"
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Bodovi</Form.Label>
            <Form.Control
              onChange={(event) => this.addValueInputChange(event)}
              name="bodovi"
              value={this.state.zadatak.bodovi}
              as="input"
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Sprint</Form.Label>
            <Form.Control
              onChange={(event) => this.addValueInputChange(event)}
              name="sprintId"
              value={this.state.zadatak.sprintId}
              as="select"
            >
              <option value={-1}></option>
              {this.state.sprintovi.map((sprint) => {
                return (
                  <option value={sprint.id} key={sprint.id}>
                    {sprint.ime}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={() => this.doAdd()}>
            Add
          </Button>
        </Form>

        <Form style={{marginTop:35}}>
          <Form.Group>
            <Form.Label>Ime zadatka</Form.Label>
            <Form.Control
              value={this.state.search.imeZadatka}
              name="imeZadatka"
              as="input"
              onChange={(e) => this.searchValueInputChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Sprint</Form.Label>
            <Form.Control
              onChange={(event) => this.searchValueInputChange(event)}
              name="idSprinta"
              value={this.state.search.idSprinta}
              as="select"
            >
              <option value={-1}></option>
              {this.state.sprintovi.map((sprint) => {
                return (
                  <option value={sprint.id} key={sprint.id}>
                    {sprint.ime}
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
              <th>Ime</th>
              <th>Zaduženi</th>
              <th>Bodovi</th>
              <th>Stanje</th>
              <th>Sprint</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.zadaci.map((zadatak) => {
              return (
                <tr key={zadatak.id}>
                  <td>{zadatak.ime}</td>
                  <td>{zadatak.zaduzeni}</td>
                  <td>{zadatak.bodovi}</td>
                  <td>{zadatak.stanjeIme}</td>
                  <td>{zadatak.sprintIme}</td>
                  <td>
                    <Button
                      disabled={zadatak.stanjeId === 3}
                      variant="info"
                      onClick={() => this.prelazak(zadatak.id)}
                    >
                      Prelazak
                    </Button>

                    <Button
                      variant="warning"
                      onClick={() => this.goToEdit(zadatak.id)}
                      style={{ marginLeft: 5 }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => this.doDelete(zadatak.id)}
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

export default Nesto;
