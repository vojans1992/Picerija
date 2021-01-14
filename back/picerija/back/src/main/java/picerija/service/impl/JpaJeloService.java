package picerija.service.impl;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import picerija.model.Jelo;
import picerija.repository.JeloRepository;
import picerija.service.JeloService;
import picerija.support.JeloDtoToJelo;
import picerija.web.dto.JeloDto;

@Service
@Transactional
public class JpaJeloService implements JeloService{

	@Autowired JeloRepository jeloRepository;
	@Autowired JeloDtoToJelo toJelo;
	
	@Override
	public Page<Jelo> all(int page) {
		// TODO Auto-generated method stub
		return jeloRepository.findAll(PageRequest.of(page, 5));
	}

	@Override
	public Optional<Jelo> one(Long id) {
		// TODO Auto-generated method stub
		return jeloRepository.findById(id);
	}

	@Override
	public Jelo save(JeloDto JeloDto) {
		// TODO Auto-generated method stub
		Jelo jelo = toJelo.convert(JeloDto);
		Jelo sacuvano = jeloRepository.save(jelo);
		return sacuvano;
	}

	@Override
	public Jelo delete(Long id) {
		// TODO Auto-generated method stub
		Optional<Jelo> opt = jeloRepository.findById(id);
		if(opt.isPresent()) {
			Jelo jelo = opt.get();
			jeloRepository.deleteById(id);
			return jelo;
		}
		return null;
	}


}
