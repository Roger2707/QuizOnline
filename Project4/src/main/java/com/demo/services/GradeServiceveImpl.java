package com.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.demo.models.GradeInfo;
import com.demo.repositories.GradeRepository;

@Repository
public class GradeServiceveImpl implements GradeService {
     @Autowired
     private GradeRepository gradeRepository;

	@Override
	public List<GradeInfo> findAll() {
		// TODO Auto-generated method stub
		return gradeRepository.findAllGradeInfo();
	}
     
     
}
