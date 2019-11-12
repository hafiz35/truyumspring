package com.cognizant.truyum.dao;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST,reason="User Already Exist")
public class UserAlreadyExistsException extends Exception {

	private static final long serialVersionUID = 1L;

	public UserAlreadyExistsException() {
		super("User Already Exist");
	}

}
