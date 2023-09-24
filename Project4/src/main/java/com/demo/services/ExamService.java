package com.demo.services;

import java.util.List;

import com.demo.models.Classes;
import com.demo.models.ClassesInfo;
import com.demo.models.Exam;
import com.demo.models.ExamInfo;

public interface ExamService {
    public List<ExamInfo> findAll();
    public boolean save(Exam exam);
    public boolean delete(int id);
    public ExamInfo find(int id);
    public int randomQuestion(int id);
}
