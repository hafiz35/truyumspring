package com.cognizant.truyum.dao;

import com.cognizant.truyum.model.Cart;

public interface CartDao {
	public void addCartItem(String user,long menuItemId);
	public Cart getAllCartItems(String user) throws CartEmptyException;
	public void removeCartItem(String user,long menuItemId);
}
