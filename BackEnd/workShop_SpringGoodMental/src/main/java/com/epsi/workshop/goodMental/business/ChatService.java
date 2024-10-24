package com.epsi.workshop.goodMental.business;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epsi.workshop.goodMental.models.Chat;
import com.epsi.workshop.goodMental.repositories.ChatRepository;
import com.epsi.workshop.goodMental.repositories.CompteAdminRepository;
import com.epsi.workshop.goodMental.repositories.CompteUtilisateurRepository;

@Service
public class ChatService implements ChatServiceInterface {
    @Autowired
    private ChatRepository chatDao;
    @Autowired
    private CompteUtilisateurRepository compteUtilisateurDao;
    @Autowired
    private CompteAdminRepository compteAdminDao;

    @Override
    public void sendMessage(Integer userId, Integer adminId, String message) {
        Chat chat = new Chat();
        chat.setUtilisateur(compteUtilisateurDao.findById(userId).orElse(null));
        chat.setAdmin(compteAdminDao.findById(adminId).orElse(null));
        chat.setMessage(message);
        chat.setLu(false);
        chatDao.save(chat);
    }

   

    @Override
    public void markAsRead(Integer chatId) {
        Chat chat = chatDao.findById(chatId).orElse(null);
        if (chat != null) {
            chat.setLu(true);
            chatDao.save(chat);
        }
    }



	@Override
	public List<Chat> getConversation(Integer userId, Integer adminId) {
		// TODO Auto-generated method stub
		return null;
	}
}
