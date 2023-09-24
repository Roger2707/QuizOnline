package com.demo.services;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MailServiceImpl implements MailService {

	@Autowired
	private JavaMailSender sender;

	@Override
	public void Send(String from, String to, String subject, String content) throws Exception {

		MimeMessage mi = sender.createMimeMessage();
		MimeMessageHelper miHelper = new MimeMessageHelper(mi);
		miHelper.setFrom(from);
		miHelper.setTo(to);
		miHelper.setSentDate(new Date());
		miHelper.setSubject(subject);
		miHelper.setText(content, true);
		sender.send(mi);
	}

	@Override
	public void Send(String from, String to, String subject, String content, MultipartFile file) throws Exception {
		MimeMessage mi = sender.createMimeMessage();
		MimeMessageHelper miHelper = new MimeMessageHelper(mi);
		miHelper.setFrom(from);
		miHelper.setTo(to);
		miHelper.setSentDate(new Date());
		miHelper.setSubject(subject);

		Multipart multipart = new MimeMultipart();
		BodyPart bodyPart = new MimeBodyPart();
		bodyPart.setContent(content, "text/html");
		multipart.addBodyPart(bodyPart);

		MimeBodyPart mimeBodyPart = new MimeBodyPart();
		mimeBodyPart.setFileName(file.getOriginalFilename());
		FileDataSource fileDataSource = new FileDataSource(convertToFile(file));
		mimeBodyPart.setDataHandler(new DataHandler(fileDataSource));
		multipart.addBodyPart(mimeBodyPart);

		mi.setContent(multipart);

		sender.send(mi);

	}

	private File convertToFile(MultipartFile multipartFile) {
		try {
			File file = new File(multipartFile.getOriginalFilename());
			file.createNewFile();
			FileOutputStream fileOutputStream = new FileOutputStream(file);
			fileOutputStream.write(multipartFile.getBytes());
			fileOutputStream.close();
			return file;
		} catch (Exception e) {
			return null;
			// TODO: handle exception
		}

	}

	@Override
	public void Send(String from, String to, String subject, String content, MultipartFile[] files) throws Exception {
		MimeMessage mi = sender.createMimeMessage();
		MimeMessageHelper miHelper = new MimeMessageHelper(mi);
		miHelper.setFrom(from);
		miHelper.setTo(to);
		miHelper.setSentDate(new Date());
		miHelper.setSubject(subject);

		Multipart multipart = new MimeMultipart();
		BodyPart bodyPart = new MimeBodyPart();
		bodyPart.setContent(content, "text/html");
		multipart.addBodyPart(bodyPart);
		for (MultipartFile file : files) {
			MimeBodyPart mimeBodyPart = new MimeBodyPart();
			mimeBodyPart.setFileName(file.getOriginalFilename());
			FileDataSource fileDataSource = new FileDataSource(convertToFile(file));
			mimeBodyPart.setDataHandler(new DataHandler(fileDataSource));
			multipart.addBodyPart(mimeBodyPart);
		}

		mi.setContent(multipart);

		sender.send(mi);

	}

}
