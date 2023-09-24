package com.demo.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import com.demo.models.LeverInfo;
import com.demo.models.Role;
import com.demo.models.RoleInfo;


@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
	@Query("select new com.demo.models.RoleInfo(roleId, name) from Role")
	public List<RoleInfo> findAllLeverInfo();
	
}
