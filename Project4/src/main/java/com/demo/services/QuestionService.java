package com.demo.services;

import java.util.List;

import com.demo.models.Check;
import com.demo.models.Question;
import com.demo.models.QuestionInfo;


public interface QuestionService {
    public List<QuestionInfo> findAll();
    public QuestionInfo findById(int id);
    public Question find(int id);
    public List<QuestionInfo> findBySubject(int id);
    public List<QuestionInfo> findByExam(int id);
    public int save(Question question);
    public boolean saveUpdate(Question question);
    public boolean delete(int id);
    public int count(Check check);
    public List<Question> getQuestionLever(int lever, int grade, int subject);
    
}
