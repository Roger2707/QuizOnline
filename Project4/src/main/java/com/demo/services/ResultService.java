package com.demo.services;

import java.util.List;

import com.demo.models.InfoDoExam;
import com.demo.models.Result;
import com.demo.models.ResultInfo;

public interface ResultService {
   public boolean save(InfoDoExam infoDoExam);
   public List<ResultInfo> findByUsername(String username);
   public List<ResultInfo> findAll();
}
