package com.demo.models;

import java.util.Date;

public class ResultInfo {
	private String username;
	private int examId;
	private int score;
	private Date created;
	
	public ResultInfo() {
		super();
	}
	public ResultInfo(String username, int examId, int score, Date created) {
		super();
		this.username = username;
		this.examId = examId;
		this.score = score;
		this.created = created;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getExamId() {
		return examId;
	}
	public void setExamId(int examId) {
		this.examId = examId;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	
}
