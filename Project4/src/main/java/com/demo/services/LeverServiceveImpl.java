package com.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.demo.models.LeverInfo;
import com.demo.repositories.LeverRepository;

@Repository
public class LeverServiceveImpl implements LeverService {
    @Autowired
    private LeverRepository leverRepository;

	@Override
	public List<LeverInfo> findAll() {
		return leverRepository.findAllLeverInfo();
	}
}
