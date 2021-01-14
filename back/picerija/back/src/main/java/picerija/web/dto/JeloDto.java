package picerija.web.dto;

import java.util.List;

import picerija.model.Cena;

public class JeloDto {

	private Long id;
	private String naziv;
	
	private List<CenaDto> cene;
	

	public JeloDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public JeloDto(Long id, String naziv) {
		super();
		this.id = id;
		this.naziv = naziv;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public List<CenaDto> getCene() {
		return cene;
	}

	public void setCene(List<CenaDto> cene) {
		this.cene = cene;
	}

	
	
}
