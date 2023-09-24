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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.models.Account;
import com.demo.models.AccountInfo;
import com.demo.models.Answer;
import com.demo.models.AnswerInfo;
import com.demo.models.Classes;
import com.demo.models.Exam;
import com.demo.models.ExamInfo;
import com.demo.models.Question;
import com.demo.models.QuestionInfo;
import com.demo.models.Subject;
import com.demo.models.SubjectInfo;
import com.demo.services.AccountService;
import com.demo.services.AnswerService;
import com.demo.services.ClassesService;
import com.demo.services.ExamService;
import com.demo.services.QuestionService;
import com.demo.services.SubjectService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/subject")
public class SubjectController {


	@Autowired
	private SubjectService subjectService;
	
	
	@RequestMapping(value = "create", method = RequestMethod.POST, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> create(@RequestBody Subject subject) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = subjectService.save(subject);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@RequestBody Subject subject) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public boolean result = subjectService.save(subject);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	@RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE,  produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> delete(@PathVariable int id) {
		try {
			
			return new ResponseEntity<Object>(new Object() {
				public int result = subjectService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@RequestMapping(value = "findAllSubject", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<SubjectInfo>> findAllQuestion() {
		try {
			return new ResponseEntity<List<SubjectInfo>>(subjectService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<SubjectInfo>>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "find/{id}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<SubjectInfo> find(@PathVariable("id") int id) {
		try {
			return new ResponseEntity<SubjectInfo>(subjectService.find(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<SubjectInfo>(HttpStatus.BAD_REQUEST);
		}
	}
	
	

}
