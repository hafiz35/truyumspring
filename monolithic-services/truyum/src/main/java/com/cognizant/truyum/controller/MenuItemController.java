package com.cognizant.truyum.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.truyum.TruyumConstants;
import com.cognizant.truyum.model.MenuItem;
import com.cognizant.truyum.service.MenuItemService;

@RequestMapping("/menu-items")
@RestController
public class MenuItemController {

	public static final Logger LOGGER = (Logger) LoggerFactory.getLogger(MenuItemController.class);

	@Autowired
	InMemoryUserDetailsManager inMemoryUserDetailsManager;

	@Autowired
	MenuItemService service;

	@GetMapping
	public List<MenuItem> getAllMenuItems() {
		LOGGER.debug("Inside getAllMenuItems");
		List<MenuItem> menuItemList;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String user = authentication.getName();
		LOGGER.debug("Username " + user);
		if (user != "anonymousUser") {
			UserDetails userDetails = inMemoryUserDetailsManager.loadUserByUsername(user);
			LOGGER.debug("Userdetails " + userDetails);
			String role = userDetails.getAuthorities().toArray()[0].toString();
			TruyumConstants.LOGGER.debug("Role " + role);
			if (role.equals("ROLE_ADMIN")) {
				LOGGER.debug("Inside MenuItemListAdmin get");
				menuItemList = service.getMenuItemListAdmin();
			} else {
				LOGGER.debug("Inside MenuItemListCustomer get");
				menuItemList = service.getMenuItemListCustomer();
			}
		} else {
			LOGGER.debug("Inside MenuItemListCustomer get");
			menuItemList = service.getMenuItemListCustomer();
		}
		return menuItemList;
	}

	@PutMapping
	public void modifyMenuItem(@RequestBody MenuItem menuItem) {
		service.modifyMenuItem(menuItem);
	}

	@GetMapping("/{menuItemId}")
	public MenuItem getMenuItem(@PathVariable long menuItemId) {
		return service.getMenuItem(menuItemId);
	}

}
