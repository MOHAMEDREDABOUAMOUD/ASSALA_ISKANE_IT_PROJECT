package com.epsi.workshop.goodMental.repositories;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.epsi.workshop.goodMental.models.CompteUtilisateur;
import com.epsi.workshop.goodMental.models.StatutUtilisateur;

public interface CompteUtilisateurRepository extends JpaRepository<CompteUtilisateur, Integer> {
    CompteUtilisateur findByEmail(String email);
    
    @Query("SELECT c FROM CompteUtilisateur c WHERE c.statut = :statut")
    List<CompteUtilisateur> findByStatut(@Param("statut") StatutUtilisateur statut);

}