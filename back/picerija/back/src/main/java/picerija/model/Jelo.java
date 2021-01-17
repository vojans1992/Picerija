package picerija.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class Jelo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String naziv;
	
	@Column
	private String slika;
	
	@OneToMany(mappedBy="jelo", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	private List<Cena> cene = new ArrayList<>();

	public Jelo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Jelo(Long id, String naziv, String slika, List<Cena> cene) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.slika = slika;
		this.cene = cene;
	}

	public String getSlika() {
		return slika;
	}

	public void setSlika(String slika) {
		this.slika = slika;
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

	public List<Cena> getCene() {
		return cene;
	}

	public void setCene(List<Cena> cene) {
		this.cene = cene;
	}

	public void addCena(Cena cena) {
		if(cena.getJelo() != this) {
			cena.setJelo(this);
		}
		cene.add(cena);
	}
	
	
	
}
