package picerija.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import picerija.model.Cena;
import picerija.repository.CenaRepository;
import picerija.service.CenaService;

@Service
public class JpaCenaService implements CenaService{

	@Autowired CenaRepository cenaRepository;

	@Override
	public List<Cena> all() {
		// TODO Auto-generated method stub
		return cenaRepository.findAll();
	}

	@Override
	public Optional<Cena> one(Long id) {
		// TODO Auto-generated method stub
		return cenaRepository.findById(id);
	}

	@Override
	public Cena save(Cena cena) {
		// TODO Auto-generated method stub
		return cenaRepository.save(cena);
	}
	
	
}
