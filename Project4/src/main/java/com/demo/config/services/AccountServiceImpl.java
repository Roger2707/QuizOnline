package com.demo.config.services;

import java.util.ArrayList;
import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.demo.config.repositories.AccountConfigRepository;
import com.demo.models.Account;


@Service
public class AccountServiceImpl implements AccountService{

	@Autowired
	private AccountConfigRepository accountRepository;
	
	@Override
	public Account save(Account account) {
		return accountRepository.save(account);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account account = accountRepository.findByUsername(username);
		if(account == null) {
			throw new UsernameNotFoundException("Username not found !!!");
		} else {
			List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
			
			roles.add(new SimpleGrantedAuthority(account.getRole().getName()));
			
//			for (Role role : account.getRoles()) {
//				roles.add(new SimpleGrantedAuthority(role.getName()));
//			}
			
			return new User(username, account.getPassword(), roles);			
		}
	}

	@Override
	public Account findByUsername(String username) {
		return accountRepository.findByUsername(username);
	}

}
