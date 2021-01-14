package picerija.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import picerija.model.Cena;

@Repository
public interface CenaRepository extends JpaRepository<Cena, Long> {

}
