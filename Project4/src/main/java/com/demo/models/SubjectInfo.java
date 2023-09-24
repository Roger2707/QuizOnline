package com.demo.models;

public class SubjectInfo {
	private Integer subjectId;
	private String name;

	public SubjectInfo() {
		super();
	}

	public SubjectInfo(Integer subjectId, String name) {
		super();
		this.subjectId = subjectId;
		this.name = name;
	}

	public Integer getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
