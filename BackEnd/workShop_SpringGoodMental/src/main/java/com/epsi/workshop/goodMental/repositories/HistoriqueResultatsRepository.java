package com.epsi.workshop.goodMental.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.epsi.workshop.goodMental.models.HistoriqueResultats;

public interface HistoriqueResultatsRepository extends JpaRepository<HistoriqueResultats, Integer> {
    List<HistoriqueResultats> findByUtilisateur_UserId(Integer userId);
    
    @Query("SELECT h FROM HistoriqueResultats h WHERE h.utilisateur.userId = :userId AND h.dateTest BETWEEN :startDate AND :endDate")
    List<HistoriqueResultats> findByUserIdAndDateRange(@Param("userId") Integer userId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}