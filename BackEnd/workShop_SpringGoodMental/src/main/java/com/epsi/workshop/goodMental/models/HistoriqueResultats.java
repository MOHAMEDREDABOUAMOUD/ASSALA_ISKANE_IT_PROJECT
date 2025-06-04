package com.epsi.workshop.goodMental.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Historique_Resultats")
public class HistoriqueResultats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer resultatId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private CompteUtilisateur utilisateur;

    @Column(nullable = false)
    private LocalDateTime dateTest;

    @Column(nullable = false)
    private Double scoreHad;

    private String recommandations;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NiveauRisque niveauRisque;

	public Integer getResultatId() {
		return resultatId;
	}

	public void setResultatId(Integer resultatId) {
		this.resultatId = resultatId;
	}

	public CompteUtilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(CompteUtilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

	public LocalDateTime getDateTest() {
		return dateTest;
	}

	public void setDateTest(LocalDateTime dateTest) {
		this.dateTest = dateTest;
	}

	public Double getScoreHad() {
		return scoreHad;
	}

	public void setScoreHad(Double scoreHad) {
		this.scoreHad = scoreHad;
	}

	public String getRecommandations() {
		return recommandations;
	}

	public void setRecommandations(String recommandations) {
		this.recommandations = recommandations;
	}

	public NiveauRisque getNiveauRisque() {
		return niveauRisque;
	}

	public void setNiveauRisque(NiveauRisque niveauRisque) {
		this.niveauRisque = niveauRisque;
	}
	public HistoriqueResultats() {
		// TODO Auto-generated constructor stub
	}

	public HistoriqueResultats(Integer resultatId, CompteUtilisateur utilisateur, LocalDateTime dateTest,
			Double scoreHad, String recommandations, NiveauRisque niveauRisque) {
		super();
		this.resultatId = resultatId;
		this.utilisateur = utilisateur;
		this.dateTest = dateTest;
		this.scoreHad = scoreHad;
		this.recommandations = recommandations;
		this.niveauRisque = niveauRisque;
	}

	@Override
	public String toString() {
		return "HistoriqueResultats [resultatId=" + resultatId + ", utilisateur=" + utilisateur + ", dateTest="
				+ dateTest + ", scoreHad=" + scoreHad + ", recommandations=" + recommandations + ", niveauRisque="
				+ niveauRisque + "]";
	}


}