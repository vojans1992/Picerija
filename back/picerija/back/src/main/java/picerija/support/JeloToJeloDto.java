package picerija.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import picerija.model.Jelo;
import picerija.web.dto.JeloDto;

@Component
public class JeloToJeloDto implements Converter<Jelo, JeloDto>{
	
	@Autowired CenaToCenaDto toCenaDto;

	@Override
	public JeloDto convert(Jelo source) {
		// TODO Auto-generated method stub
		JeloDto dto = new JeloDto();
		dto.setId(source.getId());
		dto.setNaziv(source.getNaziv());
		dto.setSlika(source.getSlika());
		dto.setCene(toCenaDto.convert(source.getCene()));
		return dto;
	}

	public List<JeloDto> convert(List<Jelo> jela){
		List<JeloDto> jelaDto = new ArrayList<>();
		for(Jelo j : jela) {
			jelaDto.add(convert(j));
		}
		return jelaDto;
	}
}
