package com.cognizant.truyum.service;

import com.cognizant.truyum.dao.UserAlreadyExistsException;
import com.cognizant.truyum.model.User;

public interface UserService {
	public void signUp(User user) throws UserAlreadyExistsException;
}
