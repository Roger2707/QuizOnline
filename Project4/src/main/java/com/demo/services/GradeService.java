package com.demo.services;

import java.util.List;

import com.demo.models.ExamInfo;
import com.demo.models.GradeInfo;

public interface GradeService {
    public List<GradeInfo> findAll();
}
