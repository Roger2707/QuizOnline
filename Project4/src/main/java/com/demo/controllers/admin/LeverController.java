package com.demo.controllers.admin;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
import com.demo.models.AnswerInfo;
import com.demo.models.LeverInfo;
import com.demo.services.AccountService;
import com.demo.services.AnswerService;
import com.demo.services.LeverService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/lever")
public class LeverController {


	@Autowired
	private LeverService leverService;
	

	
	
	@RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<LeverInfo>> findAll() {
		try {
			return new ResponseEntity<List<LeverInfo>>(leverService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<LeverInfo>>(HttpStatus.BAD_REQUEST);
		}
	}

	
	
	

}
