package com.demo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import com.demo.models.GradeInfo;
import com.demo.models.Lever;
import com.demo.models.LeverInfo;


@Repository
public interface LeverRepository extends CrudRepository<Lever, Integer> {
	@Query("select new com.demo.models.LeverInfo(leverId, name) from Lever")
	public List<LeverInfo> findAllLeverInfo();
	
}
