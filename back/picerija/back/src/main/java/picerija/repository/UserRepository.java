package picerija.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import picerija.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findFirstByUsername(String username);
	Optional<User> findFirstByUsernameAndPassword(String username, String password);
}
