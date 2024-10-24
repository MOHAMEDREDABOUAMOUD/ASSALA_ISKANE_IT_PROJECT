package com.epsi.workshop.goodMental.repositories;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.epsi.workshop.goodMental.models.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findByUtilisateur_UserIdAndAdmin_AdminId(Integer userId, Integer adminId);
    
    @Query("SELECT c FROM Chat c WHERE c.utilisateur.userId = :userId AND c.lu = false")
    List<Chat> findUnreadMessagesByUserId(@Param("userId") Integer userId);
   }