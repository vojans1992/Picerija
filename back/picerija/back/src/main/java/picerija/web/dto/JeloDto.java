package picerija.web.dto;

import java.util.List;

public class JeloDto {

	private Long id;
	private String naziv;
	

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

	
	
}
