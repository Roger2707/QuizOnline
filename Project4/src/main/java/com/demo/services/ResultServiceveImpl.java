package com.demo.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.demo.models.Account;
import com.demo.models.Exam;
import com.demo.models.InfoDoExam;
import com.demo.models.Result;
import com.demo.models.ResultId;
import com.demo.models.ResultInfo;
import com.demo.repositories.AccountRepository;
import com.demo.repositories.ExamRepository;
import com.demo.repositories.ResultRepository;

@Repository
public class ResultServiceveImpl implements ResultService {
	@Autowired
	private ResultRepository resultRepository;

	@Autowired
	private ExamRepository examRepository;
	@Autowired
	private AccountRepository accountRepository;

	@Override
	public boolean save(InfoDoExam infoDoExam) {
		try {
			Exam exam = examRepository.findExam(infoDoExam.getIdExam());
			Account account = accountRepository.findByUsername(infoDoExam.getUsername());
			Result result = new Result();
			ResultId id = new ResultId();
			id.setExamId(infoDoExam.getIdExam());
			id.setUsername(infoDoExam.getUsername());
			//result.setExam(exam);
			//result.setAccount(null);
             result.setId(id);
			int totalQuestion = exam.getEasy() + exam.getMedium() + exam.getHard();

			int corect = infoDoExam.getNumberCorrect();
			int score = (corect * 100) / totalQuestion;

			result.setScore(score);
			result.setCreated(new Date());
			resultRepository.save(result);

			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	@Override
	public List<ResultInfo> findByUsername(String username) {
		// TODO Auto-generated method stub
		return resultRepository.findByUsername(username);
	}

	@Override
	public List<ResultInfo> findAll() {
		// TODO Auto-generated method stub
		return resultRepository.findAllRe();
	}

}
