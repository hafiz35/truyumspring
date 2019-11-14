package com.cognizant.truyum.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.cognizant.truyum.TruyumConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
		TruyumConstants.LOGGER.info("Start");
		TruyumConstants.LOGGER.debug("{}: ", authenticationManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		TruyumConstants.LOGGER.info("Start");
		String header = req.getHeader("Authorization");
		TruyumConstants.LOGGER.debug(header);

		if (header == null || !header.startsWith("Bearer ")) {
			TruyumConstants.LOGGER.info("Inside if");
			chain.doFilter(req, res);
			return;
		}
		UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);
		TruyumConstants.LOGGER.info("End");
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		if (token != null) {
			Jws<Claims> jws;
			try {
				jws = Jwts.parser().setSigningKey("secretKey").parseClaimsJws(token.replace("Bearer ", ""));
				String user = jws.getBody().getSubject();
				TruyumConstants.LOGGER.debug("" + jws);
				TruyumConstants.LOGGER.debug("" + jws.getBody());
				TruyumConstants.LOGGER.debug("" + jws.getBody().getSubject());
				TruyumConstants.LOGGER.debug(user);

				if (user != null) {
					return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
				}

			} catch (JwtException ex) {
				return null;
			}
		}
		return null;
	}

}
