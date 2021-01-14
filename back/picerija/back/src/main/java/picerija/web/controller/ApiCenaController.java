package picerija.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import picerija.model.Cena;
import picerija.service.CenaService;
import picerija.support.CenaToCenaDto;
import picerija.web.dto.CenaDto;

@RestController
@RequestMapping("api/cene")
public class ApiCenaController {
	
	@Autowired CenaService cenaService;
	@Autowired CenaToCenaDto toDto;
	
	@GetMapping
	public ResponseEntity<List<CenaDto>> get(){
		List<Cena> cene = cenaService.all();
		return new ResponseEntity<>(toDto.convert(cene), HttpStatus.OK);
	}

}
