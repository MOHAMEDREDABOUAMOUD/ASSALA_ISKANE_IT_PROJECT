package com.assalaIskane.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.assalaIskane.project.models.Ouvrier;



public interface OuvrierRepository extends JpaRepository<Ouvrier, String> {
	@Query("SELECT o FROM Ouvrier o WHERE o.id_projet = :id_projet")
	List<Ouvrier> getOuvriers(@Param("id_projet") String id_projet);
}
