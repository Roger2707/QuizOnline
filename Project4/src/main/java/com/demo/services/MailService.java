package com.demo.services;

import org.springframework.web.multipart.MultipartFile;

public interface MailService {
	
	public void Send(String from, String to, String subject, String content) throws Exception;
	public void Send(String from, String to, String subject, String content, MultipartFile file) throws Exception;
	public void Send(String from, String to, String subject, String content, MultipartFile[] files) throws Exception;
}
