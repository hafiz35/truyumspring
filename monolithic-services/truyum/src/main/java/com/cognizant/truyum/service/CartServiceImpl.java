package com.cognizant.truyum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.dao.CartDao;
import com.cognizant.truyum.dao.CartEmptyException;
import com.cognizant.truyum.model.Cart;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	CartDao dao;
	
	@Override
	public void addCartItem(String user, long menuItemId) {
		dao.addCartItem(user, menuItemId);
	}

	@Override
	public Cart getAllCartItems(String user) throws CartEmptyException {
		return dao.getAllCartItems(user);
	}

	@Override
	public void removeCartItem(String user, long menuItemId) {
		dao.removeCartItem(user, menuItemId);
	}

}
