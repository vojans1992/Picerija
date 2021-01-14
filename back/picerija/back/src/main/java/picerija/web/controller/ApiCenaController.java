package picerija.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PostMapping(consumes = "application/json")
	public ResponseEntity<CenaDto> add(@Validated @RequestBody CenaDto dto) {
		Cena saved = cenaService.save(dto);
		
		return new ResponseEntity<>(toDto.convert(saved), HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/{id}", consumes = "application/json")
	public ResponseEntity<CenaDto> add(@Validated @RequestBody CenaDto dto, @PathVariable Long id){
		if(!id.equals(dto.getId())) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Cena persisted = cenaService.update(dto);
		
		return new ResponseEntity<>(toDto.convert(persisted),HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<CenaDto> delete(@PathVariable Long id){
		Cena deleted = cenaService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(toDto.convert(deleted), HttpStatus.OK);
	}

}
