package picerija;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import picerija.model.User;
import picerija.model.UserRole;
import picerija.service.UserService;

@Component
public class TestData {

	@Autowired
	private UserService userService;
		
	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostConstruct
	public void init() {
		
		List<User> users = new ArrayList<User>();
		for (int i = 1; i <= 3; i++) {
			User user = new User();
			user.setUsername("user" + i);
			user.setFirstName("First " + i);
			user.setLastName("Last " + i);
			user.setEmail("user"+i+"@mail.com");
			user.setDateOfBirth(LocalDateTime.now().minusYears(20 + i));

			// ubacen deo koda zbog greske koja se desavala ako kroz ubacivanje podataka dva puta
			// kriptujemo lozinku
			String encodedPass = passwordEncoder.encode("pass"+i);
			user.setPassword(encodedPass);

			List<UserRole> roles = Arrays.asList(UserRole.values());
			Random random = new Random();
			user.setRole(roles.get(random.nextInt(3)));
			
			users.add(user);
			userService.save(user);
			
		}
	}
}
