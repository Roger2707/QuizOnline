package com.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.demo.models.Subject;
import com.demo.models.SubjectInfo;
import com.demo.repositories.ExamRepository;
import com.demo.repositories.QuestionRepository;
import com.demo.repositories.SubjectRepository;

@Repository
public class SubjectServiceveImpl implements SubjectService {
	@Autowired
	private SubjectRepository subjectRepository;
	@Autowired
	private ExamRepository examRepository;
	@Autowired
	private QuestionRepository questionRepository;

	@Override
	public List<SubjectInfo> findAll() {
		// TODO Auto-generated method stub
		return subjectRepository.findAllSubjectInfo();
	}

	@Override
	public boolean save(Subject subject) {
		try {
			subjectRepository.save(subject);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public int delete(int id) {
		try {
			int exam = examRepository.countExamInSubject(id);
			int question = questionRepository.countQuestionInSubject(id);
			if (exam == 0 && question == 0) {
				subjectRepository.deleteById(id);
				return 1;
			}else {
				return 2;
			}
			
			
		} catch (Exception e) {
			return 0;
		}
	}

	@Override
	public SubjectInfo find(int id) {
		try {
			return subjectRepository.findSubjectInfoById(id);
		} catch (Exception e) {
			return null;
		}
	}

}
