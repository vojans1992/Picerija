package picerija.web.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import picerija.model.Jelo;
import picerija.service.JeloService;
import picerija.support.JeloToJeloDto;
import picerija.web.dto.JeloDto;

@RestController
@RequestMapping("api/jela")
public class ApiJeloController {

	@Autowired JeloService jeloService;
	@Autowired JeloToJeloDto toDto;
	
	@GetMapping
	public ResponseEntity<List<JeloDto>>get(@RequestParam(value="pageNum", defaultValue="0")int pageNum){
		Page<Jelo> page = null;
		page = jeloService.all(pageNum);
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Total-Pages", Integer.toString(page.getTotalPages()));
		
		return new ResponseEntity<>(toDto.convert(page.getContent()), HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<JeloDto> getOne(@PathVariable Long id){
		Optional<Jelo> jelo = jeloService.one(id);
		if(jelo.isPresent() != true) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(toDto.convert(jelo.get()), HttpStatus.OK);
	}
	
	@PostMapping(consumes = "application/json")
	public ResponseEntity<JeloDto> add(@Validated @RequestBody JeloDto dto){
		Jelo saved = jeloService.save(dto);
		
		return new ResponseEntity<>(toDto.convert(saved),HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/{id}", consumes = "application/json")
	public ResponseEntity<JeloDto> edit(@Validated @RequestBody JeloDto dto, @PathVariable Long id){
		if(!id.equals(dto.getId())) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Jelo persisted = jeloService.save(dto);
		
		return new ResponseEntity<>(toDto.convert(persisted), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<JeloDto> delete (@PathVariable Long id){
		Jelo deleted = jeloService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(toDto.convert(deleted), HttpStatus.OK);
	}
	
	@ExceptionHandler(value = DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
}
