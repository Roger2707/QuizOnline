package com.demo.services;

import java.util.List;

import com.demo.models.Account;
import com.demo.models.AccountInfo;
import com.demo.models.Answer;
import com.demo.models.AnswerInfo;

public interface AnswerService {
    public List<AnswerInfo> findByQuestionId(int id);
    public List<AnswerInfo> findAll();
    public boolean saveList(List<AnswerInfo> answers);
    public boolean save(Answer answer);
    public boolean delete(int id);
}
