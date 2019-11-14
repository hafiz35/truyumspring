package com.cognizant.truyum.service;

import com.cognizant.truyum.dao.CartEmptyException;
import com.cognizant.truyum.model.Cart;

public interface CartService {
	public void addCartItem(String user,long menuItemId);
	public Cart getAllCartItems(String user) throws CartEmptyException;
	public void removeCartItem(String user,long menuItemId);
	public void removeCartItemAll(String user,long menuItemId);
}
