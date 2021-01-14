package picerija.web.dto;

public class CenaDto {

	private Long id;
	private String velicina;
	private Double cena;
	private Long jeloId;
	private String jeloNaziv;
	
	public CenaDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CenaDto(Long id, String velicina, Double cena, Long jeloId, String jeloNaziv) {
		super();
		this.id = id;
		this.velicina = velicina;
		this.cena = cena;
		this.jeloId = jeloId;
		this.jeloNaziv = jeloNaziv;
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

	public Long getJeloId() {
		return jeloId;
	}

	public void setJeloId(Long jeloId) {
		this.jeloId = jeloId;
	}

	public String getJeloNaziv() {
		return jeloNaziv;
	}

	public void setJeloNaziv(String jeloNaziv) {
		this.jeloNaziv = jeloNaziv;
	}
	
	
}
