package com.cognizant.truyum.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.truyum.dao.CartEmptyException;
import com.cognizant.truyum.model.Cart;
import com.cognizant.truyum.service.CartService;

@RestController
@RequestMapping("/carts")
public class CartController {

	public static Logger LOGGER=(Logger) LoggerFactory.getLogger(CartController.class);
	
	@Autowired
	private CartService cartService;
	
	@GetMapping("/{user}")
	public Cart getAllCartItems(@PathVariable String user) throws CartEmptyException{
		LOGGER.debug("Inside getAllCartItems");
		return cartService.getAllCartItems(user);
	}
	
	@PostMapping("/{user}/{menuItemId}")
	public void addCartItem(@PathVariable String user,@PathVariable long menuItemId) {
		LOGGER.debug("Inside addCartItem");
		cartService.addCartItem(user, menuItemId);
	}
	
	@DeleteMapping("/{user}/{menuItemId}")
	public void removeCartItem(@PathVariable String user,@PathVariable long menuItemId) {
		LOGGER.debug("Inside removeCartItem");
		cartService.removeCartItem(user, menuItemId);
		
	}
	
}
