package picerija.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import picerija.model.Cena;
import picerija.model.Jelo;
import picerija.repository.CenaRepository;
import picerija.service.CenaService;
import picerija.service.JeloService;
import picerija.support.CenaDtoToCena;
import picerija.web.dto.CenaDto;

@Service
public class JpaCenaService implements CenaService{

	@Autowired CenaRepository cenaRepository;
	@Autowired CenaDtoToCena toCena;
	@Autowired JeloService jeloService;

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
	public Cena save(CenaDto cenaDto) {
		// TODO Auto-generated method stub
		Jelo jelo = jeloService.one(cenaDto.getJeloId()).get();
		Cena cena = toCena.convert(cenaDto);
		Cena sacuvana = cenaRepository.save(cena);
		jelo.getCene().add(sacuvana);
		return sacuvana;
	}
	
	@Override
	public Cena update(CenaDto cenaDto) {
		Cena cena = toCena.convert(cenaDto);
		Cena promenjena = cenaRepository.save(cena);
		return promenjena;
	}
	
	@Override
	public Cena delete(Long id) {
		Optional<Cena> opt = cenaRepository.findById(id);
		if(opt.isPresent()) {
			Cena cena = opt.get();
			cenaRepository.deleteById(id);
			return cena;
		}
		return null;
		
	}
}
