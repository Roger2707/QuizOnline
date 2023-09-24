package com.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.demo.models.Account;
import com.demo.models.Answer;
import com.demo.models.AnswerInfo;
import com.demo.repositories.AnswerRepository;
import com.demo.repositories.QuestionRepository;

@Repository
public class AnswerServiceveImpl implements AnswerService {

	@Autowired
	private AnswerRepository answerRepository;
	@Autowired
	private QuestionService questionService;

	@Override
	public List<AnswerInfo> findByQuestionId(int id) {
		// TODO Auto-generated method stub
		return answerRepository.findAnswerInfoByQuestion(id);
	}

	@Override
	public boolean save(Answer answer) {
		try {
			answerRepository.save(answer);
			return true;
		} catch (Exception e) {
			return false;
		}
	
	}

	@Override
	public boolean delete(int id) {
		try {
			answerRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	@Override
	public List<AnswerInfo> findAll() {
		
		return answerRepository.findAllAnswerInfo();
	}

	@Override
	public boolean saveList(List<AnswerInfo> answers) {
		
		for (AnswerInfo answerInfo : answers) {
			Answer answer = new Answer();
			answer.setQuestion(null);
		}
		return false;
	}
}
