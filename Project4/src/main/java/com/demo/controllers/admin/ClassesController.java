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
import com.demo.models.Classes;
import com.demo.models.ClassesInfo;
import com.demo.services.AccountService;
import com.demo.services.AnswerService;
import com.demo.services.ClassesService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/classes")
public class ClassesController {


	@Autowired
	private ClassesService classesService;
	
	
	@RequestMapping(value = "create", method = RequestMethod.POST, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> create(@RequestBody Classes classes) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = classesService.save(classes);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@RequestBody Classes classes) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = classesService.save(classes);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	@RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE,  produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> delete(@PathVariable int id) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public int result = classesService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}

	
	@RequestMapping(value = "findAllClasses", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ClassesInfo>> findAllClasses() {
		try {
			return new ResponseEntity<List<ClassesInfo>>(classesService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<ClassesInfo>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findClassesByIdGrade/id", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ClassesInfo>> findClassesByIdGrade(@PathVariable int id) {
		try {
			return new ResponseEntity<List<ClassesInfo>>(classesService.findByGradeId(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<ClassesInfo>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	

}
