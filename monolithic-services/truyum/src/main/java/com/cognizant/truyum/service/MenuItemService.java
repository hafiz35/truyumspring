package com.cognizant.truyum.service;

import java.util.List;

import com.cognizant.truyum.model.MenuItem;

public interface MenuItemService {
	public List<MenuItem> getMenuItemListAdmin();
	public List<MenuItem> getMenuItemListCustomer();
	public void modifyMenuItem(MenuItem menuItem);
	public MenuItem getMenuItem(long menuItemId);
}
