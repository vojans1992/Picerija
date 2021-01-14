package picerija.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import picerija.model.Jelo;

@Repository
public interface JeloRepository extends JpaRepository<Jelo, Long>{

}
