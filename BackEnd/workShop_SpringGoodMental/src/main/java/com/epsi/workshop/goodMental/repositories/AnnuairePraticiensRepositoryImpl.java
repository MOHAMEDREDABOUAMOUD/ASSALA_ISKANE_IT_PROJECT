package com.epsi.workshop.goodMental.repositories;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Repository;

import com.epsi.workshop.goodMental.models.AnnuairePraticiens;

@Repository
@Primary
public class AnnuairePraticiensRepositoryImpl implements AnnuairePraticiensRepository {
    @PersistenceContext
    private EntityManager entityManager;

  
    @Override
    public List<AnnuairePraticiens> searchPraticiens(String searchTerm) {
        return entityManager.createQuery(
                "SELECT a FROM AnnuairePraticiens a WHERE LOWER(a.nom) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(a.specialite) LIKE LOWER(CONCAT('%', :searchTerm, '%'))", 
                AnnuairePraticiens.class)
                .setParameter("searchTerm", searchTerm)
                .getResultList();
    }

    @Override
    public List<AnnuairePraticiens> findAll() {
        return entityManager.createQuery("SELECT a FROM AnnuairePraticiens a", AnnuairePraticiens.class).getResultList();
    }

    @Override
    public Optional<AnnuairePraticiens> findById(Integer id) {
        return Optional.ofNullable(entityManager.find(AnnuairePraticiens.class, id));
    }


	@Override
	public List<AnnuairePraticiens> findAll(Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<AnnuairePraticiens> findAllById(Iterable<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AnnuairePraticiens> List<S> saveAll(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void flush() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <S extends AnnuairePraticiens> S saveAndFlush(S entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AnnuairePraticiens> List<S> saveAllAndFlush(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteAllInBatch(Iterable<AnnuairePraticiens> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllByIdInBatch(Iterable<Integer> ids) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllInBatch() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AnnuairePraticiens getOne(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AnnuairePraticiens getById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AnnuairePraticiens getReferenceById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AnnuairePraticiens> List<S> findAll(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AnnuairePraticiens> List<S> findAll(Example<S> example, Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<AnnuairePraticiens> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AnnuairePraticiens> S save(S entity) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public boolean existsById(Integer id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(AnnuairePraticiens entity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllById(Iterable<? extends Integer> ids) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll(Iterable<? extends AnnuairePraticiens> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <S extends AnnuairePraticiens> Optional<S> findOne(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AnnuairePraticiens> Page<S> findAll(Example<S> example, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends AnnuairePraticiens> long count(Example<S> example) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public <S extends AnnuairePraticiens> boolean exists(Example<S> example) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public <S extends AnnuairePraticiens, R> R findBy(Example<S> example,
			Function<FetchableFluentQuery<S>, R> queryFunction) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<AnnuairePraticiens> findBySpecialite(String specialite) {
		// TODO Auto-generated method stub
		return null;
	}
}
