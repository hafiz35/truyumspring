package com.cognizant.truyum.controller;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.truyum.TruyumConstants;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class AuthenticationController {
	
	
	@GetMapping("/authenticate")
	public Map<String,String> authenticate(@RequestHeader("Authorization") String authHeader){
		//Logger.debug("Start");
		String user=getUser(authHeader);
		TruyumConstants.LOGGER.debug(user);
		String role=SecurityContextHolder.getContext().getAuthentication().getAuthorities().toArray()[0].toString();
		Map<String,String> auth=new HashMap<String,String>();
		auth.put("token", generateJwt(user));
		auth.put("role", role);
		//Logger.debug("End");
		return auth;
	}
	
	private String getUser(String authHeader) {
		byte[] auth=Base64.getDecoder().decode(authHeader.split(" ")[1]);
		String authSrc=new String(auth);
		return authSrc.split(":")[0];
	}
	
	private String generateJwt(String user) {
		JwtBuilder builder=Jwts.builder();
		builder.setSubject(user);
		
		builder.setIssuedAt(new Date());
		
		builder.setExpiration(new Date((new Date()).getTime()+1200000));
		builder.signWith(SignatureAlgorithm.HS256, "secretKey");
	
		String token=builder.compact();
		
		return token;
	}
	
}
