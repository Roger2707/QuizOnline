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
import com.demo.models.InfoDoExam;
import com.demo.models.Result;
import com.demo.models.ResultInfo;
import com.demo.services.AccountService;
import com.demo.services.AnswerService;
import com.demo.services.ResultService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/result")
public class ResultController {


	@Autowired
	private ResultService resultService;
	

	

	
	@RequestMapping(value = "create", method = RequestMethod.POST, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> create(@RequestBody InfoDoExam infoDoExam) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = resultService.save(infoDoExam);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	

	@RequestMapping(value = "findAllResult", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ResultInfo>> findAllResult() {
		try {
			return new ResponseEntity<List<ResultInfo>>(resultService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<ResultInfo>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findResultByUsername/{username}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ResultInfo>> findResultByUsername(@PathVariable("username") String username) {
		try {
			return new ResponseEntity<List<ResultInfo>>(resultService.findByUsername(username), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<ResultInfo>>(HttpStatus.BAD_REQUEST);
		}
	}

	
	
	

}
