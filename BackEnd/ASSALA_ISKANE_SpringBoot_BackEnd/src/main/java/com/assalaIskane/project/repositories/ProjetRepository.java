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
import com.assalaIskane.project.models.Chantier;
import com.assalaIskane.project.models.Fichier_projet;
import com.assalaIskane.project.models.Materiaux;
import com.assalaIskane.project.models.Materiaux_chantier;
import com.assalaIskane.project.models.Materiel;
import com.assalaIskane.project.models.Materiel_chantier;
import com.assalaIskane.project.models.Projet;
import com.assalaIskane.project.models.User;

public interface ProjetRepository extends JpaRepository<Projet, String> {
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO projet (id, nom, numero_marche, objet, date_ordre, date_fin, delai, id_resp) VALUES (:id, :nom, :numero_marche, :objet, :date_ordre, :date_fin, :delai, :id_resp)", nativeQuery = true)
	void insertProjet(@Param("id") String id, @Param("nom") String nom, @Param("numero_marche") String numeroMarche, @Param("objet") String objet, @Param("date_ordre") Date dateOrdre, @Param("date_fin") Date dateFin, @Param("delai") String delai, @Param("id_resp") String idResp);

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
	
	@Modifying
	@Transactional
	@Query(value = "delete from fichier_projet where id=:id", nativeQuery = true)
	void removeFichier(@Param("id") int id);


	@Query("SELECT f from Fichier_projet f where f.projet.id = :id_projet")
	List<Fichier_projet> getFichiersProjet(@Param("id_projet") String id_projet);
	
	@Query("SELECT p FROM Projet p WHERE p.resp.id = :id_resp")
	List<Projet> getProjets(@Param("id_resp") String id_resp);
	
	@Query("SELECT p FROM Projet p INNER JOIN Chantier c ON p.id = c.projet.id WHERE c.resp.id = :id_resp AND c.projet.date_ordre = (SELECT MAX(c2.projet.date_ordre) FROM Chantier c2 WHERE c2.projet.id = c.projet.id)")
	List<Projet> getProjet(@Param("id_resp") String id_resp);
	
	@Query("SELECT p FROM Projet p")
	List<Projet> getProjets();


	@Query("SELECT mc FROM Materiel_chantier mc WHERE mc.chantier.projet.id = :id_projet")
	List<Materiel_chantier> getMaterielsChantiers(@Param("id_projet") String idProjet);

	
	@Query("SELECT mc FROM Materiaux_chantier mc WHERE mc.chantier.projet.id = :id_projet")
	List<Materiaux_chantier> getMateriauxChantiers(@Param("id_projet") String id_projet);
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO besoin (nom, date_demande, qte, valide_par, id_chantier) VALUES (:nom, :date_demande, :qte, :valide_par, :id_chantier)", nativeQuery = true)
	void addBesoin(@Param("nom") String nom, @Param("date_demande") Date dateDemande, @Param("qte") String qte, @Param("valide_par") String validePar, @Param("id_chantier") int idChantier);

	@Modifying
	@Transactional
	@Query(value = "update besoin set valide_par = :id_resp where id = :id_besoin", nativeQuery = true)
	void validateBesoins(@Param("id_resp") String id_resp, @Param("id_besoin") String id_besoin);
	
	@Modifying
	@Transactional
	@Query(value = "delete from besoin where id = :id_besoin", nativeQuery = true)
	void deleteBesoins(@Param("id_besoin") String id_besoin);
	
	@Query("SELECT b FROM Besoin b WHERE b.valide_par.id = :id_resp AND b.chantier.id IN (SELECT id FROM Chantier c WHERE c.projet.id = :id_projet)")
	List<Besoin> getBesoins(@Param("id_resp") String idResp, @Param("id_projet") String id_projet);
	
	@Query("SELECT b FROM Besoin b WHERE b.valide_par.fonction <> 'service_technique' AND b.chantier.projet.id = :id_projet")
	List<Besoin> getBesoinsCC(@Param("id_projet") String id_projet);
	
	@Query("SELECT c FROM Chantier c WHERE c.projet.id = :id_projet")
	Chantier getChantier(@Param("id_projet") String id_projet);
	
	@Query("SELECT b FROM Besoin b WHERE b.valide_par.fonction = 'ChefChantier' AND b.chantier.projet.id = :id_projet")
	List<Besoin> getBesoinsRP(@Param("id_projet") String id_projet);
	
	@Query("SELECT b FROM Besoin b WHERE b.valide_par.fonction = 'responsable_projet' AND b.chantier.projet.id = :id_projet")
	List<Besoin> getBesoinsRT(@Param("id_projet") String id_projet);
	
	@Query("SELECT b FROM Besoin b WHERE b.valide_par.fonction = 'responsable_comptabiliter' AND b.chantier.projet.id = :id_projet")
	List<Besoin> getBesoinsST(@Param("id_projet") String id_projet);

	@Query("SELECT b FROM Besoin b WHERE b.valide_par.fonction = 'responsable_technique' AND b.chantier.projet.id = :id_projet")
	List<Besoin> getBesoinsRC(@Param("id_projet") String id_projet);
	
	@Query("SELECT b FROM Besoin b WHERE b.valide_par.fonction = 'service_technique' AND b.chantier.projet.id = :id_projet")
	List<Besoin> getBesoinsRM(@Param("id_projet") String id_projet);
	
	@Query("select a from Absence a where a.date_absence >= :date_debut and a.date_absence <= :date_fin and a.chantier.projet.id = :id_projet")
	List<Absence> getAbsences(@Param("id_projet") String id_projet, @Param("date_debut") Date date_debut, @Param("date_fin") Date date_fin);

	@Query("select u from User u where u.fonction = 'chef_chantier'")
	List<User> getCC();
	
	@Query("select u from User u where u.fonction = 'responsable_projet'")
	List<User> getRP();
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO materiel (nom, qte, prix) VALUES (:nom, :qte, :prix)", nativeQuery = true)
	void addMateriel(@Param("nom") String nom, @Param("qte") String qte, @Param("prix") String prix);

	@Query(value = "SELECT LAST_INSERT_ID()", nativeQuery = true)
	int getLastInsertedId();

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO materiel_chantier (id_materiel, id_chantier, qte) VALUES (:idMateriel, (select c.id from Chantier c where c.id_projet = :idProjet), :qte)", nativeQuery = true)
	void addMaterialChantier(@Param("idMateriel") int idMateriel, @Param("idProjet") String idProjet, @Param("qte") String qte);
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO materiaux (nom, type, qte, prix) VALUES (:nom, :type, :qte, :prix)", nativeQuery = true)
	void addMateriaux(@Param("nom") String nom, @Param("type") String type, @Param("qte") String qte, @Param("prix") String prix);
	
	@Modifying
	@Transactional
	@Query(value = "update materiaux_chantier set qte = :qte where id_materiaux = :id", nativeQuery = true)
	void updateMateriaux(@Param("id") String id, @Param("qte") String qte);

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO materiaux_chantier (id_materiaux, id_chantier, qte) VALUES (:idMateriau, (select c.id from Chantier c where c.id_projet = :idProjet), :qte)", nativeQuery = true)
	void addMateriauxChantier(@Param("idMateriau") int idMateriau, @Param("idProjet") String idProjet, @Param("qte") String qte);

	@Modifying
	@Transactional
	@Query(value = "update materiel_chantier m set qte = :qte where id_materiel = :id", nativeQuery = true)
	void updateMateriel(@Param("id") String id, @Param("qte") String qte);

	@Modifying
	@Transactional
	@Query(value = "delete from materiel_chantier where id_materiel = :id", nativeQuery = true)
	void deleteMateriel(@Param("id") String id);

	@Modifying
	@Transactional
	@Query(value = "delete from materiaux_chantier where id_materiaux = :id", nativeQuery = true)
	void deleteMateriau(@Param("id") String id);
}