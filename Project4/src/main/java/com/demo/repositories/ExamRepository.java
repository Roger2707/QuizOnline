package com.demo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.models.ClassesInfo;
import com.demo.models.Exam;
import com.demo.models.ExamInfo;
import com.demo.models.QuestionInfo;


@Repository
public interface ExamRepository extends CrudRepository<Exam, Integer> {
	@Query("select new com.demo.models.ExamInfo(examId,grade.gradeId, subject.subjectId, name,created, time,easy ,medium, hard, status) from Exam order by examId desc")
	public List<ExamInfo> findAllExamInfo();
	
	@Query("select new com.demo.models.ExamInfo(examId,grade.gradeId, subject.subjectId, name,created, time,easy ,medium, hard, status) from Exam where examId =:id")
	public ExamInfo find(@Param("id")int id);
	
	@Query(" from Exam where examId =:id")
	public Exam findExam(@Param("id")int id);
	
	@Query("select count(*) from Exam where subject.id=:id")
	public int countExamInSubject(@Param("id")int id);

}
