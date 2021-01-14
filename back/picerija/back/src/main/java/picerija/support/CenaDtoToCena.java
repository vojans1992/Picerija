package picerija.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import picerija.model.Cena;
import picerija.model.Jelo;
import picerija.service.CenaService;
import picerija.service.JeloService;
import picerija.web.dto.CenaDto;

@Component
public class CenaDtoToCena implements Converter<CenaDto, Cena> {

	@Autowired JeloService jeloService;
	@Autowired CenaService cenaService;
	
	@Override
	public Cena convert(CenaDto source) {
		// TODO Auto-generated method stub
		Jelo jelo = null;
		if(source.getJeloId() != null) {
			jelo = jeloService.one(source.getJeloId()).get();
		}
		
		if(jelo != null) {
			Long id = source.getId();
			Cena cena = id == null ? new Cena() : cenaService.one(id).get();
			if(cena != null) {
				cena.setId(source.getId());
				cena.setVelicina(source.getVelicina());
				cena.setCena(source.getCena());
				cena.setJelo(jelo);
			}
			return cena;
		}else {
			throw new IllegalStateException("Trying to attach to non-existant entities");
		}
	}

}
