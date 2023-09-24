package com.demo.services;

import java.util.List;

import com.demo.models.Classes;
import com.demo.models.ClassesInfo;

public interface ClassesService {
    public List<ClassesInfo> findByGradeId(int id);
    public List<ClassesInfo> findAll();
    public boolean save(Classes classes);
    public int delete(int id);
    public boolean setStatusClass(int id, boolean status);
}
