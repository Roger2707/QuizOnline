package com.demo.config.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.models.Account;


@Repository
public interface AccountConfigRepository extends CrudRepository<Account, Integer>{  
	
	@Query("from Account where username = :username")
	public com.demo.models.Account findByUsername(@Param("username") String username);
}