package com.epsi.workshop.goodMental.business;

import java.util.List;

import com.epsi.workshop.goodMental.models.Chat;

public interface ChatServiceInterface {
    void sendMessage(Integer userId, Integer adminId, String message);
    List<Chat> getConversation(Integer userId, Integer adminId);
    void markAsRead(Integer chatId);
}
