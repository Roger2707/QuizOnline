package com.demo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.models.LeverInfo;
import com.demo.models.Result;
import com.demo.models.ResultId;
import com.demo.models.ResultInfo;


@Repository
public interface ResultRepository extends CrudRepository<Result, ResultId> {
	@Query("select new com.demo.models.ResultInfo(id.username,id.examId, score, created) from Result where id.username = :username")
	public List<ResultInfo> findByUsername(@Param("username") String username);
	
	@Query("select new com.demo.models.ResultInfo(id.username,id.examId, score, created) from Result order by created desc")
	public List<ResultInfo> findAllRe();
}
