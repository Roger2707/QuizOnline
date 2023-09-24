package com.demo.models;

public class RoleInfo {
	private Integer roleId;
	private String name;
	
	public RoleInfo() {
		super();
	}
	public RoleInfo(Integer roleId, String name) {
		super();
		this.roleId = roleId;
		this.name = name;
	}
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
