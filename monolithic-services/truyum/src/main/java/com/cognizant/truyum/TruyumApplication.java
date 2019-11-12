package com.cognizant.truyum;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@SpringBootApplication
public class TruyumApplication implements WebMvcConfigurer {

	public static final Logger LOGGER=(Logger) LoggerFactory.getLogger(TruyumApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(TruyumApplication.class, args);
		LOGGER.info("Logged from Truyum Application");
	}
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("GET","PUSH","PUT","DELETE").allowedOrigins("http://localhost:4200");
    }

}
