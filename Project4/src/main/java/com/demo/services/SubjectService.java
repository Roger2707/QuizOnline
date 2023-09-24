package com.demo.services;

import java.util.List;

import com.demo.models.Question;
import com.demo.models.QuestionInfo;
import com.demo.models.Subject;
import com.demo.models.SubjectInfo;

public interface SubjectService {
	   public List<SubjectInfo> findAll();
	    public boolean save(Subject subject);
	    public int delete(int id);
	    public SubjectInfo find(int id);
}
