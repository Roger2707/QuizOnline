package com.demo.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.demo.models.Classes;
import com.demo.models.Exam;
import com.demo.models.ExamInfo;
import com.demo.models.Question;
import com.demo.repositories.ExamRepository;
import com.demo.repositories.QuestionRepository;

@Repository
public class ExamServiceveImpl implements ExamService {
	@Autowired
	private ExamRepository examRepository;

	@Autowired
	private QuestionService questionService;

	@Override
	public List<ExamInfo> findAll() {
		// TODO Auto-generated method stub
		return examRepository.findAllExamInfo();
	}

	@Override
	public boolean save(Exam exam) {
		try {

			List<Question> questions = randomQues(exam);

			for (Question question : questions) {
				exam.getQuestions().add(question);
			}

			examRepository.save(exam);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			examRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public ExamInfo find(int id) {
		// TODO Auto-generated method stub
		return examRepository.find(id);
	}

	@Override
	public int randomQuestion(int id) {

		return 0;
	}

	private List<Question> randomQues(Exam exam) {
		List<Question> ez = questionService.getQuestionLever(1, exam.getGrade().getGradeId(),
				exam.getSubject().getSubjectId());
		List<Question> md = questionService.getQuestionLever(2, exam.getGrade().getGradeId(),
				exam.getSubject().getSubjectId());
		List<Question> hd = questionService.getQuestionLever(3, exam.getGrade().getGradeId(),
				exam.getSubject().getSubjectId());
		List<Question> afterRand = new ArrayList<>();

		if (exam.getEasy() > 0) {
			List<Question> ranEz = random(ez, exam.getEasy());
			if (ranEz.size()>0) {
				for (Question question : ranEz) {
					afterRand.add(question);
				}
			}
		}

		if (exam.getMedium() > 0) {
			List<Question> ranMd= random(md, exam.getMedium());
			if (ranMd.size()>0) {
				for (Question question : ranMd) {
					afterRand.add(question);
				}
			}
		}

		if (exam.getHard() > 0) {
			List<Question> ranHd =random(hd, exam.getHard());
			if (ranHd.size()>0) {
				for (Question question : ranHd) {
					afterRand.add(question);
				}
			}
		}

		return afterRand;
	}

	public List<Question> random(List<Question> questions, int num) {
		Random rand = new Random();
		List<Question> questionRand = new ArrayList<Question>();
		List<Question> questions2 = questions;
		System.out.println(1);
		int numberOfElements = num;

		for (int i = 0; i < numberOfElements; i++) {
			int randomIndex = rand.nextInt(questions2.size());
			Question randomElement = questions2.get(randomIndex);
			questionRand.add(randomElement);
			questions2.remove(randomIndex);
		}
		return questionRand;
	}
}
