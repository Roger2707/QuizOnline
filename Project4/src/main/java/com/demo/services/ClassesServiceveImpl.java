package com.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.demo.models.Classes;
import com.demo.models.ClassesInfo;
import com.demo.repositories.AccountRepository;
import com.demo.repositories.ClassesRepository;

@Repository
public class ClassesServiceveImpl implements ClassesService {
    @Autowired
    private ClassesRepository classesRepository;
    @Autowired
    private AccountRepository accountRepository;

	@Override
	public List<ClassesInfo> findByGradeId(int id) {
		// TODO Auto-generated method stub
		return classesRepository.findClassByIdGrade(id);
	}

	@Override
	public List<ClassesInfo> findAll() {
		// TODO Auto-generated method stub
		return classesRepository.findAllClass();
	}

	@Override
	public boolean save(Classes classes) {
		try {
			classesRepository.save(classes);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public int delete(int id) {
		try {
			int student = accountRepository.countStudentInClass(id);
			if (student==0) {
				classesRepository.deleteById(id);	
				return 1;
			}else {
				return 2;
			}

		} catch (Exception e) {
			return 0;
		}
	}

	@Override
	public boolean setStatusClass(int id, boolean status) {
		try {
			Classes classes =  classesRepository.findById(id).get();
			classes.setStatus(status);
			classesRepository.save(classes);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
