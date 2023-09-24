package com.demo.models;

public class AnswerInfo {
	private Integer answerId;
	private Integer questionId;
	private String content;
	private boolean status;
	private String photo;

	public AnswerInfo() {
		super();
	}

	public AnswerInfo(Integer answerId, Integer questionId, String content, boolean status, String photo) {
		super();
		this.answerId = answerId;
		this.questionId = questionId;
		this.content = content;
		this.status = status;
		this.photo = photo;
	}

	public Integer getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

}
