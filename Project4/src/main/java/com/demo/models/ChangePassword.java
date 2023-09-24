package com.demo.models;

public class ChangePassword {
	private String username;
	private String password;
	private String newPass;

	public ChangePassword() {
		super();
	}

	public ChangePassword(String username, String password, String newPass) {
		super();
		this.username = username;
		this.password = password;
		this.newPass = newPass;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNewPass() {
		return newPass;
	}

	public void setNewPass(String newPass) {
		this.newPass = newPass;
	}

}
