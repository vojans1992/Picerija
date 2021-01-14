package picerija.service;

import java.util.List;
import java.util.Optional;

import picerija.model.Cena;

public interface CenaService {

	List<Cena> all();
	Optional<Cena> one(Long id);
	Cena save(Cena cena);
}
