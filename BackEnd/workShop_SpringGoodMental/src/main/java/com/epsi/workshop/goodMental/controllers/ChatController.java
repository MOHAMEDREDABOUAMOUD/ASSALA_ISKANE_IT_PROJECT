package com.epsi.workshop.goodMental.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epsi.workshop.goodMental.business.ChatService;
import com.epsi.workshop.goodMental.models.Chat;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatService service;

    @PostMapping("/sendMessage")
    public void sendMessage(@RequestParam Integer userId, @RequestParam Integer adminId, 
                            @RequestParam String message) {
        service.sendMessage(userId, adminId, message);
    }

    @GetMapping("/getConversation")
    public List<Chat> getConversation(@RequestParam Integer userId, @RequestParam Integer adminId) {
        return service.getConversation(userId, adminId);
    }

    @PostMapping("/markAsRead")
    public void markAsRead(@RequestParam Integer chatId) {
        service.markAsRead(chatId);
    }
}