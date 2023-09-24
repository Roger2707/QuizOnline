package com.demo.config.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.demo.models.Account;


public interface AccountService extends UserDetailsService{
	public Account save(Account account);
	public Account findByUsername(String username);
	
}
