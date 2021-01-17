package picerija.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import picerija.model.Jelo;
import picerija.service.JeloService;
import picerija.web.dto.JeloDto;

@Component
public class JeloDtoToJelo implements Converter<JeloDto, Jelo> {
	
	@Autowired JeloService jeloService;

	@Override
	public Jelo convert(JeloDto source) {
		// TODO Auto-generated method stub
		Long id = source.getId();
		Jelo jelo = id == null ? new Jelo() : jeloService.one(id).get();
		if(jelo != null) {
			jelo.setNaziv(source.getNaziv());
			jelo.setSlika(source.getSlika());
		}
		return jelo;
	}

}
