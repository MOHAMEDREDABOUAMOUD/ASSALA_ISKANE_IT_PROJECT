package com.assalaIskane.project.repositories;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.assalaIskane.project.models.Ouvrier;



public interface OuvrierRepository extends JpaRepository<Ouvrier, String> {
	@Query("SELECT o FROM Ouvrier o WHERE id_projet = :id_projet")
	List<Ouvrier> getOuvriers(@Param("id_projet") String id_projet);
	
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO ouvrier (id, id_projet,nom,prenom, numero) VALUES (:id, :id_projet, :nom, :prenom ,:numero)", nativeQuery = true)
	void AddOuvrier(@Param("id") String id,@Param("id_projet") String id_projet,@Param("nom") String nom,@Param("prenom") String prenom, @Param("numero") String numero);;


}


