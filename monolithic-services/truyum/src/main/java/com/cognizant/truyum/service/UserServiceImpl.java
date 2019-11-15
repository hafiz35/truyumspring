package com.cognizant.truyum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.truyum.dao.UserAlreadyExistsException;
import com.cognizant.truyum.dao.UserDao;
import com.cognizant.truyum.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao dao;
	
	@Override
	public void signUp(User user) throws UserAlreadyExistsException {
		dao.signUp(user);
	}

	@Override
	public boolean checkUserExists(String username){
		return dao.checkUserExists(username);
	}

}
