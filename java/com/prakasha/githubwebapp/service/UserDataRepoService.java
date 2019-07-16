package com.prakasha.githubwebapp.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prakasha.githubwebapp.db.UserDataEntity;
import com.prakasha.githubwebapp.db.UserDataRepository;
import com.prakasha.githubwebapp.model.UserData;



@Service
public class UserDataRepoService {

	@Autowired
	UserDataRepository userDataRepository;
	
	public UserDataEntity insertUserData(UserData userData, String ownerId) {
		UserDataEntity entity = new UserDataEntity();
		entity.setLogin(userData.getlogin());
		entity.setLocation(userData.getLocation());
		entity.setName(userData.getName());
		entity.setSearchTime(new Date());
		entity.setOwnerId(ownerId);
		userDataRepository.save(entity);
		return entity;
	}
	
	public void deleteEntities(List<Long> ids) {
		userDataRepository.deleteAll(userDataRepository.findAllById(ids));
	}
	
	public List<UserDataEntity> getUserHistory(String ownerId) {
		return userDataRepository.findByOwner(ownerId);
	}
}
