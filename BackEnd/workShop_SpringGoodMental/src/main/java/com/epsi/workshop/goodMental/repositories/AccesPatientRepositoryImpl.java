package com.epsi.workshop.goodMental.repositories;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;

import com.epsi.workshop.goodMental.models.AccesPatient;
import com.epsi.workshop.goodMental.models.AccesPatientId;

public class AccesPatientRepositoryImpl implements AccesPatientRepository{

	@PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<AccesPatient> findByAdmin_AdminId(Integer adminId) {
        return entityManager.createQuery("SELECT a FROM AccesPatient a WHERE a.admin.adminId = :adminId", AccesPatient.class)
                .setParameter("adminId", adminId)
                .getResultList();
    }

    @Override
    public List<AccesPatient> findByUtilisateur_UserId(Integer userId) {
        return entityManager.createQuery("SELECT a FROM AccesPatient a WHERE a.utilisateur.userId = :userId", AccesPatient.class)
                .setParameter("userId", userId)
                .getResultList();
    }
	
	@Override
	public List<AccesPatient> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<AccesPatient> findAll(Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<AccesPatient> findAllById(Iterable<AccesPatientId> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AccesPatient> List<S> saveAll(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void flush() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <S extends AccesPatient> S saveAndFlush(S entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AccesPatient> List<S> saveAllAndFlush(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteAllInBatch(Iterable<AccesPatient> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllByIdInBatch(Iterable<AccesPatientId> ids) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllInBatch() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AccesPatient getOne(AccesPatientId id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AccesPatient getById(AccesPatientId id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AccesPatient getReferenceById(AccesPatientId id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AccesPatient> List<S> findAll(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AccesPatient> List<S> findAll(Example<S> example, Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<AccesPatient> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AccesPatient> S save(S entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<AccesPatient> findById(AccesPatientId id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean existsById(AccesPatientId id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void deleteById(AccesPatientId id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(AccesPatient entity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllById(Iterable<? extends AccesPatientId> ids) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll(Iterable<? extends AccesPatient> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <S extends AccesPatient> Optional<S> findOne(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AccesPatient> Page<S> findAll(Example<S> example, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AccesPatient> long count(Example<S> example) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public <S extends AccesPatient> boolean exists(Example<S> example) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public <S extends AccesPatient, R> R findBy(Example<S> example,
			Function<FetchableFluentQuery<S>, R> queryFunction) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
