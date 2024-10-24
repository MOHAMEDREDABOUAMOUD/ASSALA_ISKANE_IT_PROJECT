package com.epsi.workshop.goodMental.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.epsi.workshop.goodMental.models.CompteAdmin;

public interface CompteAdminRepository extends JpaRepository<CompteAdmin, Integer> {
    @Qualifier("compteAdminRepository") // Spécifiez le bean que vous voulez injecter
	CompteAdmin findByEmail(String email);
    
    @Query("SELECT c FROM CompteAdmin c WHERE c.role = :role")
    List<CompteAdmin> findByRole(@Param("role") String role);
}
