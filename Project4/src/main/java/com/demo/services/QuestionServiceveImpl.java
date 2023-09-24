package com.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.demo.models.Answer;
import com.demo.models.Check;
import com.demo.models.Question;
import com.demo.models.QuestionInfo;
import com.demo.repositories.AnswerRepository;
import com.demo.repositories.QuestionRepository;

@Repository
public class QuestionServiceveImpl implements QuestionService {
	@Autowired
	private QuestionRepository questionRepository;

	@Autowired
	private AnswerRepository answerRepository;

	@Override
	public List<QuestionInfo> findAll() {
		// TODO Auto-generated method stub
		return questionRepository.findAllQuestionInfo();
	}

	@Override
	public int save(Question question) {
		try {

			question = questionRepository.save(question);
			for (Answer ans : question.getAnswers()) {
				ans.setQuestion(question);
				answerRepository.save(ans);
			}

			return question.getQuestionId();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			questionRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public List<QuestionInfo> findBySubject(int id) {
		// TODO Auto-generated method stub
		return questionRepository.findAllQuestionBySubject(id);
	}

	@Override
	public QuestionInfo findById(int id) {
		// TODO Auto-generated method stub
		return questionRepository.findQuestionInfoById(id);
	}

	@Override
	public List<Question> getQuestionLever(int lever, int grade, int subject) {
		// TODO Auto-generated method stub
		return questionRepository.findQuestionLever(lever, grade, subject);
	}

	@Override
	public boolean saveUpdate(Question question) {
		try {
			Question old = questionRepository.findQuestion(1);

			List<Answer> answersOld = new ArrayList<>(old.getAnswers());

			List<Answer> answersNew = new ArrayList<>(question.getAnswers());
			
			List<Answer> list = new ArrayList<>(old.getAnswers());  

			int manyOldQuest = old.getAnswers().size();
			int manyNewQuest = question.getAnswers().size();
			
			Question newQuestion = questionRepository.save(question);
			System.out.println(question.getQuestionId());
			if (manyNewQuest > manyOldQuest || manyNewQuest == manyOldQuest) {
				System.out.println("This case 1");
				for (Answer answer : answersNew) {
					answer.setQuestion(newQuestion);
					answerRepository.save(answer);
				}
			} else if (manyNewQuest < manyOldQuest) {
				System.out.println("This case 2");
				for (Answer answer : answersOld) {
					for (Answer answer2 : answersNew) {
						if (answer.getAnswerId() == answer2.getAnswerId()) {
							answer2.setQuestion(newQuestion);
							list.remove(answer);
							answerRepository.save(answer2);

						}
					}
				}
				for (Answer answer : list) {
					System.out.println(answer.getAnswerId());
					answerRepository.deleteById(answer.getAnswerId());
				}
			}

			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	@Override
	public int count(Check check) {

		return questionRepository.countQuestion(check.getLeverId(), check.getGradeId(), check.getSubjectId());
	}

	@Override
	public Question find(int id) {
		// TODO Auto-generated method stub
		return questionRepository.findById(id).get();
	}

	@Override
	public List<QuestionInfo> findByExam(int id) {
		// TODO Auto-generated method stub
		return questionRepository.findQuestionInfoByExam(id);
	}
}
