package com.demo.models;

public class LeverInfo {
	private Integer leverId;
	private String name;
	
	public LeverInfo() {
		super();
	}
	public LeverInfo(Integer leverId, String name) {
		super();
		this.leverId = leverId;
		this.name = name;
	}
	public Integer getLeverId() {
		return leverId;
	}
	public void setLeverId(Integer leverId) {
		this.leverId = leverId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
