package com.epsi.workshop.goodMental.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Questionnaire")
public class Questionnaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer questionId;

    @Column(nullable = false)
    private String intituleQuestion;

    @Column(nullable = false)
    private String categorie;

    @Column(nullable = false)
    private String optionsReponses;

    @Column(nullable = false)
    private Double ponderation;

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public String getIntituleQuestion() {
		return intituleQuestion;
	}

	public void setIntituleQuestion(String intituleQuestion) {
		this.intituleQuestion = intituleQuestion;
	}

	public String getCategorie() {
		return categorie;
	}

	public void setCategorie(String categorie) {
		this.categorie = categorie;
	}

	public String getOptionsReponses() {
		return optionsReponses;
	}

	public void setOptionsReponses(String optionsReponses) {
		this.optionsReponses = optionsReponses;
	}

	public Double getPonderation() {
		return ponderation;
	}

	public void setPonderation(Double ponderation) {
		this.ponderation = ponderation;
	}


}