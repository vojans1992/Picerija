package picerija.service;

import java.util.Optional;

import org.springframework.data.domain.Page;

import picerija.model.Jelo;
import picerija.web.dto.JeloDto;

public interface JeloService {

	Page<Jelo> all(int page);
	Optional<Jelo> one(Long id);
	Jelo save(JeloDto JeloDto);
	Jelo delete(Long id);
	
}
