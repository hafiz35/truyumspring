package com.cognizant.truyum.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.cognizant.truyum.model.MenuItem;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Repository;

@Repository
public class MenuItemDaoCollectionImpl implements MenuItemDao {
	
	List<MenuItem> menuItems,menuItemListCustomer;
	ApplicationContext context;
	public MenuItemDaoCollectionImpl() {
		context=new ClassPathXmlApplicationContext("truyum.xml");
		menuItems=(List<MenuItem>) context.getBean("menuitems");
		((ConfigurableApplicationContext)context).close();
	}
	
	@Override
	public List<MenuItem> getMenuItemListAdmin() {
		return menuItems;
	}

	@Override
	public List<MenuItem> getMenuItemListCustomer() {
		menuItemListCustomer=new ArrayList<MenuItem>();
		for(MenuItem menuItem:menuItems) {
			Date dateOfExpiry=menuItem.getDateOfExpiry();
			Date today=new Date();
			boolean isActive=menuItem.isActive();
			if((dateOfExpiry.before(today) || dateOfExpiry.equals(today)) && isActive) {
				menuItemListCustomer.add(menuItem);
			}
		}
		return menuItemListCustomer;
	}

	@Override
	public void modifyMenuItem(MenuItem menuItem) {
		int i=0;
		for(MenuItem mItem:menuItems) {
			if(mItem.getId()==menuItem.getId()) {
				menuItems.set(i, menuItem);
				break;
			}
			i++;
		}

	}

	@Override
	public MenuItem getMenuItem(long menuItemId) {
		for(MenuItem menuItem:menuItems) {
			if(menuItem.getId()==menuItemId) {
				return menuItem;
			}
		}
		return null;
	}

}
