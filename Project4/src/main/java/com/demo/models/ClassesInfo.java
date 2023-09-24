package com.demo.models;

public class ClassesInfo {
	private Integer classId;
	private int grade;
	private String name;
	private int quantity;
	private boolean status;

	
	public ClassesInfo() {
		super();
	}
	public ClassesInfo(Integer classId, int grade, String name, int quantity, boolean status) {
		super();
		this.classId = classId;
		this.grade = grade;
		this.name = name;
		this.quantity = quantity;
		this.status = status;
	}
	public Integer getClassId() {
		return classId;
	}
	public void setClassId(Integer classId) {
		this.classId = classId;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
}
