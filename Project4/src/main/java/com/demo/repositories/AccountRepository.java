package com.demo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.models.Account;
import com.demo.models.AccountInfo;


@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
	@Query("from Account where username = :username")
	public Account findByUsername(@Param("username") String username);
	
	@Query("select new com.demo.models.AccountInfo(username, classes.name, role.roleId,firstName,lastName,address,email,dob,phone,gender,avatar, status) from Account where username != 'admin' order by created desc")
	public List<AccountInfo> findAllAccountInfo();
	
	@Query("select new com.demo.models.AccountInfo(username, classes.name, role.roleId,firstName,lastName,address,email,dob,phone,gender,avatar, status) from Account where username = :username")
	public AccountInfo findByUsernameInfo(@Param("username") String username);
	
	@Query("select new com.demo.models.AccountInfo(username, classes.name, role.roleId,firstName,lastName,address,email,dob,phone,gender,avatar, status) from Account where id = :id")
	public AccountInfo findByIdInfo(@Param("id") int id);
	
	@Query("select new com.demo.models.AccountInfo(username, classes.name, role.roleId,firstName,lastName,address,email,dob,phone,gender,avatar, status) from Account where classes.classId = :id and username != 'admin' ")
	public List<AccountInfo> findByClass(@Param("id") int id);
	
	@Query("select count(*) from Account where classes.classId = :id")
	public int countStudentInClass(@Param("id") int id);
}
