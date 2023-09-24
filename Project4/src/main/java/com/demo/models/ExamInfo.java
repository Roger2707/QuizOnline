package com.demo.models;

import java.util.Date;

public class ExamInfo {
	private int examId;
	private int gradeId;
	private int subjectId;
	private String name;
	private Date created;
	private int time;
	private int easy;
	private int medium;
	private int hard;
	private boolean status;
	
	public ExamInfo() {
		super();
	}
	public ExamInfo(int examId, int gradeId, int subjectId, String name, Date created, int time, int easy, int medium,
			int hard, boolean status) {
		super();
		this.examId = examId;
		this.gradeId = gradeId;
		this.subjectId = subjectId;
		this.name = name;
		this.created = created;
		this.time = time;
		this.easy = easy;
		this.medium = medium;
		this.hard = hard;
		this.status = status;
	}
	public int getExamId() {
		return examId;
	}
	public void setExamId(int examId) {
		this.examId = examId;
	}
	public int getGradeId() {
		return gradeId;
	}
	public void setGradeId(int gradeId) {
		this.gradeId = gradeId;
	}
	public int getSubjectId() {
		return subjectId;
	}
	public void setSubjectId(int subjectId) {
		this.subjectId = subjectId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getEasy() {
		return easy;
	}
	public void setEasy(int easy) {
		this.easy = easy;
	}
	public int getMedium() {
		return medium;
	}
	public void setMedium(int medium) {
		this.medium = medium;
	}
	public int getHard() {
		return hard;
	}
	public void setHard(int hard) {
		this.hard = hard;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
	
	
	
}
