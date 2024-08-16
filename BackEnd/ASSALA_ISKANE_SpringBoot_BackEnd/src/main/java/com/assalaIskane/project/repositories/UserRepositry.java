package com.assalaIskane.project.repositories;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.assalaIskane.project.models.User;

public interface UserRepositry extends JpaRepository<User, String> {
	@Query("SELECT u FROM User u WHERE u.id = :id AND u.pass = :pass")
	User findUserByIdAndPass(@Param("id") String id, @Param("pass") String pass);

    User save(User user);
    
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.nom = :nom, u.prenom = :prenom, u.fonction = :fonction, u.numero = :numero, u.pass = :pass WHERE u.id = :id")
    void updateUser(@Param("id") String id, @Param("nom") String nom, @Param("prenom") String prenom, @Param("fonction") String fonction, @Param("numero") String numero, @Param("pass") String pass);
}
