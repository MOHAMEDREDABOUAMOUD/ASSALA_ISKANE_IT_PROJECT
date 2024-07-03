package com.assalaIskane.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assalaIskane.project.models.User;



public interface UserRepositry extends JpaRepository<User, Integer>{
	@Override
	default List<User> findAll() {
		// TODO Auto-generated method stub
		return null;
	}
}
