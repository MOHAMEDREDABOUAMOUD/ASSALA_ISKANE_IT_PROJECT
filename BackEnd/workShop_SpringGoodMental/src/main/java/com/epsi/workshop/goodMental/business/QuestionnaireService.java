package com.epsi.workshop.goodMental.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epsi.workshop.goodMental.models.Questionnaire;
import com.epsi.workshop.goodMental.repositories.QuestionnaireRepository;

@Service
public class QuestionnaireService<S> implements QuestionnaireServiceInterface {
    @Autowired
    private QuestionnaireRepository questionnaireDao;

    @Override
    public void addQuestion(String intituleQuestion, String categorie, String optionsReponses, Double ponderation) {
        Questionnaire question = new Questionnaire();
        question.setIntituleQuestion(intituleQuestion);
        question.setCategorie(categorie);
        question.setOptionsReponses(optionsReponses);
        question.setPonderation(ponderation);
     //   questionnaireDao.saveAll(question);
    }

    @Override
    public List<Questionnaire> getAllQuestions() {
        return questionnaireDao.findAll();
    }
}