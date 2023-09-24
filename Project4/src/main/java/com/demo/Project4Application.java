package com.demo;

import javax.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.demo.services.FilesStorageService;


@SpringBootApplication
public class Project4Application implements CommandLineRunner {
	
	@Resource
	  FilesStorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(Project4Application.class, args);
	}
	
	@Override
	  public void run(String... arg) throws Exception {
//	    storageService.deleteAll();
	    storageService.init();
	  }
}
