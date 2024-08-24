package com.assalaIskane.project.repositories;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.assalaIskane.project.models.Besoin;
import com.assalaIskane.project.models.Fichier_projet;
import com.assalaIskane.project.models.Materiaux_chantier;
import com.assalaIskane.project.models.Materiel_chantier;
import com.assalaIskane.project.models.Ouvrier;
import com.assalaIskane.project.models.Projet;

public interface ProjetRepository extends JpaRepository<Projet, String> {
	
	@Modifying
    @Transactional
    @Query("insert into projet(id, nom, date_demande, qte, valide_par, id_chantier) values(:id, :nom, :date_demande, :qte, :valide_par, :id_chantier);"
    		+ "insert into chantier(id_projet, id_resp) values(:id, :id_resp_chantier);")
    void createProjet(@Param("id") String id, @Param("nom") String nom, @Param("numero_marche") String numero_marche, @Param("objet") String objet, @Param("date_ordre") Date date_ordre, @Param("date_fin") Date date_fin, @Param("delai") int delai, @Param("id_resp") String id_resp, @Param("id_resp_chantier") String id_resp_chantier);
	
	@Modifying
    @Transactional
    @Query("insert into absence(id_ouvrier, date_absence, id_chantier, absent) values(:id_ouvrier, :date_absence, :id_chantier, :absent)")
    void AddAbsence(@Param("id_ouvrier") String id_ouvrier, @Param("date_absence") Date date_absence, @Param("id_chantier") int id_chantier, @Param("absent") int absent);
	
	@Modifying
    @Transactional
    @Query("insert into fichier_projet(nom, fichier, id_projet) values(:nom, :fichier, :id_projet)")
    void addFichier(@Param("nom") String nom, @Param("fichier") Base64 fichier, @Param("id_projet") String id_projet);

	@Query("SELECT f from Fichier f where f.id_projet = :id_projet")
	List<Fichier_projet> getFichiersProjet(@Param("id_projet") String id_projet);
	
	@Query("SELECT p FROM Projet p inner join chantier c on o.id = c.id_projet WHERE c.id_resp = :id_resp AND c.date_ordre = (\r\n" + 
			"    SELECT MAX(c2.date_ordre) \r\n" + 
			"    FROM Chantier c2 \r\n" + 
			"    WHERE c2.id_projet = c.id_projet\r\n" + 
			")")
	List<Projet> getProjets(@Param("id_resp") String id_resp);
	
	@Query("SELECT * FROM Projet")
	List<Projet> getProjets();
	
	@Query("SELECT m FROM Materiel m inner join Materiel_chantier mc inner join chantier c on c.id=mc.id_chantier and m.id = mc.id_materiel WHERE c.id_projet = :id_projet")
	List<Materiel_chantier> getMaterielsChantiers(@Param("id_projet") String id_projet);
	
	@Query("SELECT m FROM Materiaux m inner join Materiaux_chantier mc inner join chantier c on c.id=mc.id_chantier and m.id = mc.id_materiaux WHERE c.id_projet = :id_projet")
	List<Materiaux_chantier> getMateriauxChantiers(@Param("id_projet") String id_projet);
	
	@Modifying
    @Transactional
    @Query("insert into besoin(nom, date_demande, qte, valide_par, id_chantier) values(:nom, :date_demande, :qte, :valide_par, :id_chantier)")
    void addBesoin(@Param("nom") String nom, @Param("date_demande") Date date_demande, @Param("qte") String qte, @Param("valide_par") String valide_par, @Param("id_chantier") int id_chantier);

	@Query("SELECT b from besoin b where valide_par = :id_resp and id_chantier = (select id from chantier where id_projet = :id_projet)")
	List<Besoin> getBesoins(@Param("id_resp") String id_resp, @Param("id_projet") String id_projet);
}