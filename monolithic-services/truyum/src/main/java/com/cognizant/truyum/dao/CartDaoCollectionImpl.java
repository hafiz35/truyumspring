package com.cognizant.truyum.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cognizant.truyum.model.Cart;
import com.cognizant.truyum.model.MenuItem;

@Repository
public class CartDaoCollectionImpl implements CartDao {

	private static HashMap<String,Cart> userCarts;
	 public CartDaoCollectionImpl() {
		 super();
		if(userCarts==null) {
			userCarts=new HashMap<>();
		}
	}
	
	@Override
	public void addCartItem(String user, long menuItemId) {
		MenuItemDao menuItemDao=new MenuItemDaoCollectionImpl();
		MenuItem menuItem=menuItemDao.getMenuItem(menuItemId);
		boolean editedQuantity=false;
		if(userCarts.containsKey(user)) {
			List<MenuItem> cartList=userCarts.get(user).getMenuItemList();
			for(MenuItem mItem:cartList) {
				if(mItem.getId()==menuItemId) {
					mItem.setQuantity(mItem.getQuantity()+1);
					editedQuantity=true;
					break;
				}
			}
			if(editedQuantity==false) {
				menuItem.setQuantity(1);
				userCarts.get(user).getMenuItemList().add(menuItem);
			}
		}
		else {
			Cart cart=new Cart(new ArrayList<>(),0.0);
			menuItem.setQuantity(1);
			cart.getMenuItemList().add(menuItem);
			userCarts.put(user, cart);
		}
	}

	@Override
	public Cart getAllCartItems(String user) throws CartEmptyException {
		if(userCarts.containsKey(user)) {
			Cart cart=userCarts.get(user);
			List<MenuItem> cartList=cart.getMenuItemList();
			if(cartList.isEmpty()) {
				throw new CartEmptyException();
			}
			else {
				double total=0.0d;
				for(MenuItem menuItem:cartList) {
					total+=(menuItem.getPrice()*menuItem.getQuantity());
				}
				cart.setTotal(total);
				return cart;
			}
			
		}
		else {
			throw new CartEmptyException();
		}
	}

	@Override
	public void removeCartItem(String user, long menuItemId) {
		List<MenuItem> cartList=userCarts.get(user).getMenuItemList();
		for(MenuItem menuItem:cartList) {
			if(menuItem.getId()==menuItemId) {
				menuItem.setQuantity(menuItem.getQuantity()-1);
				if(menuItem.getQuantity()==0)
					cartList.remove(menuItem);
				break;
			}
		}
	}
	@Override
	public void removeCartItemAll(String user, long menuItemId) {
		List<MenuItem> cartList=userCarts.get(user).getMenuItemList();
		for(MenuItem menuItem:cartList) {
			if(menuItem.getId()==menuItemId) {
				System.out.println("Delete All");
				menuItem.setQuantity(0);
				if(menuItem.getQuantity()==0)
					cartList.remove(menuItem);
				break;
			}
		}
	}

}
