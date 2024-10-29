package com.epsi.workshop.goodMental.business;

import com.epsi.workshop.goodMental.models.DictonFeelGood;

public interface DictonFeelGoodServiceInterface {
    void addDicton(String texteDicton, String auteur);
    DictonFeelGood getRandomDicton();
}
