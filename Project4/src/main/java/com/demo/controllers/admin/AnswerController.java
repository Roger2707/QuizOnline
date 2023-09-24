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
import com.demo.services.AccountService;
import com.demo.services.AnswerService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/answer")
public class AnswerController {


	@Autowired
	private AnswerService answerService;
	
	@RequestMapping(value = "findByQuestion/{id}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<AnswerInfo>> findByQuestion(@PathVariable("id") int id) {
		try {
			return new ResponseEntity<List<AnswerInfo>>(answerService.findByQuestionId(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<AnswerInfo>>(HttpStatus.BAD_REQUEST);
		}
	}
	

	
	@RequestMapping(value = "create", method = RequestMethod.POST, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> create(@RequestBody Answer answer) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = answerService.save(answer);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@RequestBody Answer answer) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = answerService.save(answer);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	@RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE,  produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> delete(@PathVariable int id) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = answerService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	@RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<AnswerInfo>> findAll() {
		try {
			return new ResponseEntity<List<AnswerInfo>>(answerService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<AnswerInfo>>(HttpStatus.BAD_REQUEST);
		}
	}

	
	
	

}
