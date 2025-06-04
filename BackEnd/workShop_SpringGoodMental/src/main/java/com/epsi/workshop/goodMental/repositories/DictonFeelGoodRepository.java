package com.epsi.workshop.goodMental.repositories;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.epsi.workshop.goodMental.models.DictonFeelGood;

public interface DictonFeelGoodRepository extends JpaRepository<DictonFeelGood, Integer> {
    @Query(value = "SELECT * FROM Dicton_Feel_Good ORDER BY RAND() LIMIT 1")
    DictonFeelGood findRandomDicton();
}
