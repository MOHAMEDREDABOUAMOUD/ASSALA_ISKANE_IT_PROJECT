package com.epsi.workshop.goodMental.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epsi.workshop.goodMental.business.DictonFeelGoodService;
import com.epsi.workshop.goodMental.models.DictonFeelGood;

@RestController
@RequestMapping("/api/dicton")
public class DictonFeelGoodController {
    @Autowired
    private DictonFeelGoodService service;

    @PostMapping("/addDicton")
    public void addDicton(@RequestParam String texteDicton, @RequestParam String auteur) {
        service.addDicton(texteDicton, auteur);
    }

    @GetMapping("/getRandomDicton")
    public DictonFeelGood getRandomDicton() {
        return service.getRandomDicton();
    }
}