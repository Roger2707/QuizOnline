package com.demo.models;

import java.util.Date;

public class QuestionInfo {
	private Integer questionId;
	private int gradeId;
	private int leverId;
	private int subjectId;
	private String name;
	private String content;
	private Date created;
	private String type;
	private String photo;
	private boolean status;

	public QuestionInfo() {
		super();
	}

	public QuestionInfo(Integer questionId, int gradeId, int leverId, int subjectId, String name, String content,
			Date created, String type, String photo, boolean status) {
		super();
		this.questionId = questionId;
		this.gradeId = gradeId;
		this.leverId = leverId;
		this.subjectId = subjectId;
		this.name = name;
		this.content = content;
		this.created = created;
		this.type = type;
		this.photo = photo;
		this.status = status;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public int getGradeId() {
		return gradeId;
	}

	public void setGradeId(int gradeId) {
		this.gradeId = gradeId;
	}

	public int getLeverId() {
		return leverId;
	}

	public void setLeverId(int leverId) {
		this.leverId = leverId;
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

}
