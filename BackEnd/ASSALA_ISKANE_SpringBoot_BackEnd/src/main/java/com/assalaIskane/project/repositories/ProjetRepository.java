package com.assalaIskane.project.repositories;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.assalaIskane.project.models.Absence;
import com.assalaIskane.project.models.Besoin;
import com.assalaIskane.project.models.Fichier_projet;
import com.assalaIskane.project.models.Materiaux;
import com.assalaIskane.project.models.Materiel;
import com.assalaIskane.project.models.Projet;

public interface ProjetRepository extends JpaRepository<Projet, String> {
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO projet (id, nom, numero_marche, objet, date_ordre, date_fin, delai, id_resp) VALUES (:id, :nom, :numero_marche, :objet, :date_ordre, :date_fin, :delai, :id_resp)", nativeQuery = true)
	void insertProjet(@Param("id") String id, @Param("nom") String nom, @Param("numero_marche") String numeroMarche, @Param("objet") String objet, @Param("date_ordre") Date dateOrdre, @Param("date_fin") Date dateFin, @Param("delai") int delai, @Param("id_resp") String idResp);

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO chantier (id_projet, id_resp) VALUES (:id, :id_resp_chantier)", nativeQuery = true)
	void insertChantier(@Param("id") String idProjet, @Param("id_resp_chantier") String idRespChantier);

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO absence (id_ouvrier, date_absence, id_chantier, absent) VALUES (:id_ouvrier, :date_absence, :id_chantier, :absent)", nativeQuery = true)
	void addAbsence(@Param("id_ouvrier") String id_ouvrier, @Param("date_absence") Date date_absence, @Param("id_chantier") int id_chantier, @Param("absent") int absent);

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO fichier_projet (nom, fichier, id_projet) VALUES (:nom, :fichier, :id_projet)", nativeQuery = true)
	void addFichier(@Param("nom") String nom, @Param("fichier") byte[] fichier, @Param("id_projet") String idProjet);


	@Query("SELECT f from Fichier_projet f where f.projet.id = :id_projet")
	List<Fichier_projet> getFichiersProjet(@Param("id_projet") String id_projet);
	
	@Query("SELECT p FROM Projet p INNER JOIN Chantier c ON p.id = c.projet.id WHERE c.resp.id = :id_resp AND c.projet.date_ordre = (SELECT MAX(c2.projet.date_ordre) FROM Chantier c2 WHERE c2.projet.id = c.projet.id)")
	List<Projet> getProjets(@Param("id_resp") String id_resp);
	
	@Query("SELECT p FROM Projet p")
	List<Projet> getProjets();

	
	@Query("SELECT m FROM Materiel m INNER JOIN Materiel_chantier mc ON m.id = mc.materiel.id INNER JOIN Chantier c ON c.id = mc.chantier.id WHERE c.projet.id = :id_projet")
	List<Materiel> getMaterielsChantiers(@Param("id_projet") String idProjet);

	
	@Query("SELECT m FROM Materiaux m INNER JOIN Materiaux_chantier mc ON m.id = mc.materiaux.id INNER JOIN Chantier c ON c.id = mc.chantier.id WHERE c.projet.id = :id_projet")
	List<Materiaux> getMateriauxChantiers(@Param("id_projet") String id_projet);
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO besoin (nom, date_demande, qte, valide_par, id_chantier) VALUES (:nom, :date_demande, :qte, :valide_par, :id_chantier)", nativeQuery = true)
	void addBesoin(@Param("nom") String nom, @Param("date_demande") Date dateDemande, @Param("qte") String qte, @Param("valide_par") String validePar, @Param("id_chantier") int idChantier);

	@Query("SELECT b FROM Besoin b WHERE b.valide_par.id = :id_resp AND b.chantier.id IN (SELECT id FROM Chantier c WHERE c.projet.id = :id_projet)")
	List<Besoin> getBesoins(@Param("id_resp") String idResp, @Param("id_projet") String idProjet);
	
	@Query("select a from Absence a where a.date_absence >= :date_debut and a.date_absence <= :date_fin and a.chantier.projet.id = :id_projet")
	List<Absence> getAbsences(@Param("id_projet") String id_projet, @Param("date_debut") Date date_debut, @Param("date_fin") Date date_fin);

}