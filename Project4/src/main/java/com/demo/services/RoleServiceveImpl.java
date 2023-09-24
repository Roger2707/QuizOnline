package com.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.demo.models.RoleInfo;
import com.demo.repositories.RoleRepository;

@Repository
public class RoleServiceveImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

	@Override
	public List<RoleInfo> findAll() {
		// TODO Auto-generated method stub
		return null;
	}
    
}
