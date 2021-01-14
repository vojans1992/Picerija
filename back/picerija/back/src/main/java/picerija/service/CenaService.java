package picerija.service;

import java.util.List;
import java.util.Optional;

import picerija.model.Cena;
import picerija.web.dto.CenaDto;

public interface CenaService {

	List<Cena> all();
	Optional<Cena> one(Long id);
	Cena save(CenaDto cenaDto);
	Cena update(CenaDto cenaDto);
	Cena delete(Long id);
}
