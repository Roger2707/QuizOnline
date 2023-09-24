package com.demo.controllers.login;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.stereotype.Controller;

import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.demo.models.Account;
import com.demo.models.AccountInfo;
import com.demo.models.Answer;
import com.demo.models.ChangePassword;
import com.demo.services.AccountService;

@CrossOrigin(origins = "http://localhost:3000/")	
@RestController
@RequestMapping("api/account")
public class AccountController {


	@Autowired
	private AccountService accountService;
	

	@RequestMapping(value = "findall", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<AccountInfo>> findAll() {
		try {
			return new ResponseEntity<List<AccountInfo>>(accountService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<AccountInfo>>(HttpStatus.BAD_REQUEST);
		}
	}
	@RequestMapping(value = "findByUsername/{username}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<AccountInfo> findByUsername(@PathVariable("username") String username) {
		try {
			return new ResponseEntity<AccountInfo>(accountService.findByUsernameInfo(username), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<AccountInfo>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAllStudentInClass/{id}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<AccountInfo>> findAllStudentInClass(@PathVariable("id") int id) {
		try {
			return new ResponseEntity<List<AccountInfo>>(accountService.findByClass(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<AccountInfo>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@RequestMapping(value = "create", method = RequestMethod.POST, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> create(@RequestBody Account account) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = accountService.save(account, 0);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	@RequestMapping(value = "updateAvatar/{username}/{avatar}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> updateAvatar(@PathVariable("username") String username,@PathVariable("avatar") String avatar) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = accountService.updateAvatar(username, avatar);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	@RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@RequestBody Account account) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = accountService.save(account, 1);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	@RequestMapping(value = "changePassword", method = RequestMethod.PUT, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> changePassword(@RequestBody ChangePassword changePassword) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public int result = accountService.changePassword(changePassword);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@RequestMapping(value = "resetPassword/{username}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> resetPassword(@PathVariable("username") String username) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public int result = accountService.resetPassword(username);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	@RequestMapping(value = "changeStatus/{username}/{check}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> changeStatus(@PathVariable("username") String username, @PathVariable("check") int check) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public int result = accountService.resetPassword(username);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	@RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE,  produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> delete(@PathVariable int id) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = accountService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}


	
	
	

}
