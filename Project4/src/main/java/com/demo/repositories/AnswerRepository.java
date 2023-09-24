package com.demo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.models.AccountInfo;
import com.demo.models.Answer;
import com.demo.models.AnswerInfo;


@Repository
public interface AnswerRepository extends CrudRepository<Answer, Integer> {
	@Query("select new com.demo.models.AnswerInfo(answerId,question.questionId, content, status,photo) from Answer where question.questionId = :id")
	public List<AnswerInfo> findAnswerInfoByQuestion(@Param("id") int id);
	
	@Query("select new com.demo.models.AnswerInfo(answerId,question.questionId, content, status,photo) from Answer")
	public List<AnswerInfo> findAllAnswerInfo();
	
	@Query(" from Answer where question.questionId = :id")
	public List<Answer> findAnswerByQuestion(@Param("id") int id);
}
