package com.demo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;


import com.demo.models.Subject;
import com.demo.models.SubjectInfo;


@Repository
public interface SubjectRepository extends CrudRepository<Subject, Integer> {
	@Query("select new com.demo.models.SubjectInfo(subjectId, name) from Subject order by id desc")
	public List<SubjectInfo> findAllSubjectInfo();
	
	@Query("select new com.demo.models.SubjectInfo(subjectId, name) from Subject where subjectId = :id")
	public SubjectInfo findSubjectInfoById(int id);
	

}
