package com.epsi.workshop.goodMental.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epsi.workshop.goodMental.models.AccesPatient;
import com.epsi.workshop.goodMental.models.AccesPatientId;

public interface AccesPatientRepository extends JpaRepository<AccesPatient, AccesPatientId> {
    List<AccesPatient> findByAdmin_AdminId(Integer adminId);
    List<AccesPatient> findByUtilisateur_UserId(Integer userId);
}