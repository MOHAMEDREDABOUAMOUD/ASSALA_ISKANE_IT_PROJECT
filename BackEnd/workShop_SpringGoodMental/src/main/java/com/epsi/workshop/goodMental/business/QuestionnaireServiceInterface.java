package com.epsi.workshop.goodMental.business;

import java.util.List;

import com.epsi.workshop.goodMental.models.Questionnaire;

public interface QuestionnaireServiceInterface {
    void addQuestion(String intituleQuestion, String categorie, String optionsReponses, Double ponderation);
    List<Questionnaire> getAllQuestions();
}
