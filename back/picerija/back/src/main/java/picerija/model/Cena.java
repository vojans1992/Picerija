package picerija.model;

import javax.persistence.*;

@Entity
public class Cena {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String velicina;
	
	@Column
	private Double cena;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Jelo jelo;

	public Cena() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Cena(Long id, String velicina, Double cena, Jelo jelo) {
		super();
		this.id = id;
		this.velicina = velicina;
		this.cena = cena;
		this.jelo = jelo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVelicina() {
		return velicina;
	}

	public void setVelicina(String velicina) {
		this.velicina = velicina;
	}

	public Double getCena() {
		return cena;
	}

	public void setCena(Double cena) {
		this.cena = cena;
	}

	public Jelo getJelo() {
		return jelo;
	}

	public void setJelo(Jelo jelo) {
		this.jelo = jelo;
		if(!jelo.getCene().contains(this)) {
			jelo.getCene().add(this);
		}
	}
	
	
}
