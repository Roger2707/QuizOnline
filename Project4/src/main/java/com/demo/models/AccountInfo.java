package com.demo.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AccountInfo {
	private String username;
	private String classes;
	private int role;
	private String firstName;
	private String lastName;
	private String address;
	private String email;
	private Date dob;
	private String phone;
	private boolean gender;
	private String avatar;
	private byte status;

	public AccountInfo() {
		super();
	}

	public AccountInfo(String username, String classes, int role, String firstName, String lastName,
			String address, String email, Date dob, String phone, boolean gender, String avatar, byte status) {
		super();
		this.username = username;
		this.classes = classes;
		this.role = role;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.email = email;
		this.dob = dob;
		this.phone = phone;
		this.gender = gender;
		this.avatar = avatar;
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getClasses() {
		return classes;
	}

	public void setClasses(String classes) {
		this.classes = classes;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public boolean isGender() {
		return gender;
	}

	public void setGender(boolean gender) {
		this.gender = gender;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public byte getStatus() {
		return status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

}
