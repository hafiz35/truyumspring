package com.cognizant.truyum.dao;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND,reason="Cart is Empty")
public class CartEmptyException extends Exception {
	
	private static final long serialVersionUID = 1L;

	public CartEmptyException() {
		super("Cart Is Empty");
	}
}
