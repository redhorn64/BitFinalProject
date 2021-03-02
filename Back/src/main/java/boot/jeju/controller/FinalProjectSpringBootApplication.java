package boot.jeju.controller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("boot.jeju.*")
public class FinalProjectSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalProjectSpringBootApplication.class, args);
	}

}
