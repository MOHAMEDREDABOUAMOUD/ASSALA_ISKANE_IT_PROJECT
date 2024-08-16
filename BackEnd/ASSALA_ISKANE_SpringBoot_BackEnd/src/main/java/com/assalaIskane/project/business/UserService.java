package com.assalaIskane.project.business;

import org.springframework.stereotype.Service;

import com.assalaIskane.project.models.User;
import com.assalaIskane.project.repositories.UserRepositry;

@Service
public class UserService implements UserServiceInterface{
	private UserRepositry userDao;
	
	public UserService(UserRepositry userDao) {
		this.userDao = userDao;
	}

	@Override
	public User getUserByIdAndPass(String id, String pass) {
		return userDao.findUserByIdAndPass(id, pass);
	}

	@Override
	public User addUser(User user) {
		return userDao.save(user);
	}

	@Override
	public void updateUser(String id, String nom, String prenom, String fonction, String numero, String pass) {
		userDao.updateUser(id, nom, prenom, fonction, numero, pass);
	}
	

}
