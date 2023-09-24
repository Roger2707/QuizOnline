package com.demo.models;

public class GradeInfo {
	private Integer gradeId;
	private String name;
	
	public GradeInfo() {
		super();
	}
	public GradeInfo(Integer gradeId, String name) {
		super();
		this.gradeId = gradeId;
		this.name = name;
	}
	public Integer getGradeId() {
		return gradeId;
	}
	public void setGradeId(Integer gradeId) {
		this.gradeId = gradeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
