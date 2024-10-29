package com.epsi.workshop.goodMental.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epsi.workshop.goodMental.models.DictonFeelGood;
import com.epsi.workshop.goodMental.repositories.DictonFeelGoodRepository;

@Service
public class DictonFeelGoodService implements DictonFeelGoodServiceInterface {
    @Autowired
    private DictonFeelGoodRepository dictonFeelGoodDao;

    @Override
    public void addDicton(String texteDicton, String auteur) {
        DictonFeelGood dicton = new DictonFeelGood();
        dicton.setTexteDicton(texteDicton);
        dicton.setAuteur(auteur);
        dictonFeelGoodDao.save(dicton);
    }

    @Override
    public DictonFeelGood getRandomDicton() {
        return dictonFeelGoodDao.findRandomDicton();
    }
}
