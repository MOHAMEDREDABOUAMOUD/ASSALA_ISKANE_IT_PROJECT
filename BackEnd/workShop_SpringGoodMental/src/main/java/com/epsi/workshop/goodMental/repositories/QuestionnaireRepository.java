package com.epsi.workshop.goodMental.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epsi.workshop.goodMental.models.Questionnaire;

public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Integer> {
    List<Questionnaire> findByCategorie(String categorie);

	List<Questionnaire> findAll();
}
