package com.epsi.workshop.goodMental.repositories;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.epsi.workshop.goodMental.models.AnnuairePraticiens;

public interface AnnuairePraticiensRepository extends JpaRepository<AnnuairePraticiens, Integer> {
    List<AnnuairePraticiens> findBySpecialite(String specialite);
    
 // In AnnuairePraticiensRepository
    @Query("SELECT a FROM AnnuairePraticiens a WHERE LOWER(a.nom) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(a.specialite) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<AnnuairePraticiens> searchPraticiens(@Param("searchTerm") String searchTerm);

}

