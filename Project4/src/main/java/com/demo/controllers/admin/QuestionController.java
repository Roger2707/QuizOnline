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
import com.demo.models.Check;
import com.demo.models.Classes;
import com.demo.models.Exam;
import com.demo.models.ExamInfo;
import com.demo.models.Question;
import com.demo.models.QuestionInfo;
import com.demo.services.AccountService;
import com.demo.services.AnswerService;
import com.demo.services.ClassesService;
import com.demo.services.ExamService;
import com.demo.services.QuestionService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/question")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@RequestMapping(value = "create", method = RequestMethod.POST, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> create(@RequestBody Question question) {
		try {

			return new ResponseEntity<Object>(new Object() {
				public int idQuestion = questionService.save(question);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}

	}

	@RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@RequestBody Question question) {
		try {

			return new ResponseEntity<Object>(new Object() {
				public boolean result = questionService.saveUpdate(question);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}

	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> delete(@PathVariable int id) {
		try {

			return new ResponseEntity<Object>(new Object() {
				public boolean result = questionService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}

	}

	@RequestMapping(value = "findAllQuestion", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<QuestionInfo>> findAllQuestion() {
		try {
			return new ResponseEntity<List<QuestionInfo>>(questionService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<QuestionInfo>>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "findBySubject/{id}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<QuestionInfo>> findBySubject(@PathVariable("id") int id) {
		try {
			return new ResponseEntity<List<QuestionInfo>>(questionService.findBySubject(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<QuestionInfo>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findByExam/{id}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<QuestionInfo>> findByExam(@PathVariable("id") int id) {
		try {
			return new ResponseEntity<List<QuestionInfo>>(questionService.findByExam(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<QuestionInfo>>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "findById/{id}", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<QuestionInfo> findById(@PathVariable("id") int id) {
		try {
			return new ResponseEntity<QuestionInfo>(questionService.findById(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<QuestionInfo>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "countCheck", method = RequestMethod.POST,consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> countCheck(@RequestBody Check check ) {
		try {

			return new ResponseEntity<Object>(new Object() {
				public int count = questionService.count(check);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}

}
