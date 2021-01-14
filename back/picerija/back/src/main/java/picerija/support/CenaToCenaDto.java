package picerija.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import picerija.model.Cena;
import picerija.web.dto.CenaDto;

@Component
public class CenaToCenaDto implements Converter<Cena, CenaDto>{

	@Override
	public CenaDto convert(Cena source) {
		// TODO Auto-generated method stub
		CenaDto dto = new CenaDto();
		dto.setId(source.getId());
		dto.setVelicina(source.getVelicina());
		dto.setCena(source.getCena());
		dto.setJeloId(source.getJelo().getId());
		dto.setJeloNaziv(source.getJelo().getNaziv());
		return dto;
	}

	public List<CenaDto> convert(List<Cena> cene) {
		List<CenaDto> ceneDto = new ArrayList<>();
		for(Cena c : cene) {
			ceneDto.add(convert(c));
		}
		return ceneDto;
	}
}
