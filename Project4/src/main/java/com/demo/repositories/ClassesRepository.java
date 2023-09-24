package com.demo.repositories;



import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.demo.models.Classes;
import com.demo.models.ClassesInfo;



@Repository
public interface ClassesRepository extends CrudRepository<Classes, Integer> {
	@Query("select new com.demo.models.ClassesInfo(classId,grade.gradeId, name, quantity,status) from Classes where grade.gradeId = :id")
	public List<ClassesInfo> findClassByIdGrade(@Param("id") int id);
	
	@Query("select new com.demo.models.ClassesInfo(classId,grade.gradeId, name, quantity,status) from Classes order by classId desc")
	public List<ClassesInfo> findAllClass();
	
}
