package com.assalaIskane.project.business;

import com.assalaIskane.project.models.User;

public interface UserServiceInterface {
	User getUserByIdAndPass(String id, String pass);
	User addUser(User user);
	void updateUser(String id, String nom, String prenom, String fonction, String numero, String pass);	
}
