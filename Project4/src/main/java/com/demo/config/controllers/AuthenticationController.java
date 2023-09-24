
package com.demo.config.controllers;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.config.request.AuthenticationRequest;
import com.demo.config.response.LoginResponse;
import com.demo.config.response.UserInfo;
import com.demo.config.services.AccountService;
import com.demo.configurations.JWTTokenHelper;
import com.demo.models.Account;
import com.demo.models.AccountInfo;


@RestController
@RequestMapping("/api/v1")
@CrossOrigin()
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	JWTTokenHelper jWTTokenHelper;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private AccountService accountService;

	@PostMapping("/auth/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {

		final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getUserName(), authenticationRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		//User user=(User)authentication.getPrincipal();
		User user = (User)authentication.getPrincipal();
		
		System.out.println("---------------------------------");
		System.out.println("username: " + user.getUsername());
		System.out.println("Auth dang Login: " + authentication.getName());
		
		String jwtToken=jWTTokenHelper.generateToken(user.getUsername());
		
		LoginResponse response=new LoginResponse();
		response.setToken(jwtToken);
		
		return ResponseEntity.ok(response);
	}
	
//	@GetMapping("/auth/userinfo")
//	public ResponseEntity<?> getUserInfo(Authentication user){
//		//Account userObj=(Account) userDetailsService.loadUserByUsername(user.getName());
//		
//		System.out.println("---------------------------------");
//		System.out.println("userAuth: " + user.getName());
//		
//		Account userObj = accountService.findByUsername(user.getName());
//		
//		UserInfo userInfo=new UserInfo();
//		userInfo.setFirstName(userObj.getFirstName());
//		userInfo.setLastName(userObj.getLastName());
//		userInfo.setUserName(userObj.getUsername());
//		userInfo.setRole(userObj.getRole().getName());
//		
//		return ResponseEntity.ok(userInfo);
//		
//		
//		
//	}
	
	@GetMapping("/auth/userinfo")
	public ResponseEntity<?> getUserInfo(Authentication user){
		//Account userObj=(Account) userDetailsService.loadUserByUsername(user.getName());
		
		System.out.println("---------------------------------");
		System.out.println("userAuth: " + user.getName());
		
		Account userObj = accountService.findByUsername(user.getName());
		
		AccountInfo userInfo = new AccountInfo();
		userInfo.setUsername(userObj.getUsername());
		userInfo.setClasses(userObj.getClasses().getName());
		userInfo.setRole(userObj.getRole().getRoleId());
		userInfo.setFirstName(userObj.getFirstName());
		userInfo.setLastName(userObj.getLastName());
		userInfo.setDob(userObj.getDob());
		userInfo.setGender(userObj.isGender());
		userInfo.setPhone(userObj.getPhone());
		userInfo.setEmail(userObj.getEmail());
		userInfo.setAddress(userObj.getAddress());
		userInfo.setStatus(userObj.getStatus());
		userInfo.setAvatar(userObj.getAvatar());
		return ResponseEntity.ok(userInfo);
		
		
		
	}
	
	@GetMapping("/auth/test")
	public String testApp() {
		return "Hello Spring Security!";
	}
}
