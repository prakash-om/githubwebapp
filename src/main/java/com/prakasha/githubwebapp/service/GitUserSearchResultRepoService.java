package com.prakasha.githubwebapp.service;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prakasha.githubwebapp.db.GitUserSearchResultEntity;
import com.prakasha.githubwebapp.db.GitUserSearchResultRepository;
import com.prakasha.githubwebapp.uti.SequenceGenerator;

@Service
public class GitUserSearchResultRepoService {
	@Autowired
	private GitUserSearchResultRepository gitUserSearchResultRepository;

	public GitUserSearchResultEntity insertSearchResult(GitUserSearchResultEntity entity, String searchItem,
			String owner) {
		entity.setSerachItem(searchItem);
		entity.setTime(new Date());
		entity.setId(SequenceGenerator.nextGloballyUniqueLong());
		entity.setOwner(owner);
		gitUserSearchResultRepository.save(entity);
		return entity;
	}

	public List<GitUserSearchResultEntity> getUserSearchHistory(String owner) {
		return gitUserSearchResultRepository.findByOwner(owner);
	}

	public void deleteHistory(List<Long> ids) {
		pdeleteHistory(ids);
		
	}

	private void pdeleteHistory(List<Long> ids) {
		for (long id: ids) {
			GitUserSearchResultEntity entity = gitUserSearchResultRepository.findAllById(id);
			if (entity!= null)
				gitUserSearchResultRepository.delete(entity);
		}
			
	}

	public GitUserSearchResultEntity getById(long id) {
		return gitUserSearchResultRepository.findAllById(id);
	}
}
