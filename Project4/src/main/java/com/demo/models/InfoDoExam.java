package com.demo.models;

public class InfoDoExam {
	private int idExam;
	private String username;
	private int numberCorrect;

	public InfoDoExam() {
		super();
	}

	public InfoDoExam(int idExam, String username, int numberCorrect) {
		super();
		this.idExam = idExam;
		this.username = username;
		this.numberCorrect = numberCorrect;
	}

	public int getIdExam() {
		return idExam;
	}

	public void setIdExam(int idExam) {
		this.idExam = idExam;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getNumberCorrect() {
		return numberCorrect;
	}

	public void setNumberCorrect(int numberCorrect) {
		this.numberCorrect = numberCorrect;
	}

}
