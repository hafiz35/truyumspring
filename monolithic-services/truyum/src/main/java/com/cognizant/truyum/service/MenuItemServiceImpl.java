package com.cognizant.truyum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.dao.MenuItemDao;
import com.cognizant.truyum.model.MenuItem;

@Service
public class MenuItemServiceImpl implements MenuItemService {
	@Autowired
	MenuItemDao dao;

	@Override
	public List<MenuItem> getMenuItemListAdmin() {
		return dao.getMenuItemListAdmin();
	}

	@Override
	public List<MenuItem> getMenuItemListCustomer() {
		return dao.getMenuItemListCustomer();
	}

	@Override
	public void modifyMenuItem(MenuItem menuItem) {
		dao.modifyMenuItem(menuItem);
	}

	@Override
	public MenuItem getMenuItem(long menuItemId) {
		return dao.getMenuItem(menuItemId);
	}

}
