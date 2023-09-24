package com.demo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import com.demo.models.ExamInfo;
import com.demo.models.Grade;
import com.demo.models.GradeInfo;


@Repository
public interface GradeRepository extends CrudRepository<Grade, Integer> {
	@Query("select new com.demo.models.GradeInfo(gradeId, name) from Grade")
	public List<GradeInfo> findAllGradeInfo();
	
}
