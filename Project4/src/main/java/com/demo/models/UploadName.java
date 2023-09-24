package com.demo.models;

import org.springframework.web.multipart.MultipartFile;

public class UploadName {
    private MultipartFile file;
    private String name;
    
	public UploadName() {
		super();
	}

	public UploadName(MultipartFile file, String name) {
		super();
		this.file = file;
		this.name = name;
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
    
}
