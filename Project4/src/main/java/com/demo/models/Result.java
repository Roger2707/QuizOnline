package com.demo.models;
// Generated Nov 23, 2022, 2:56:37 PM by Hibernate Tools 4.3.6.Final

import java.util.Date;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Result generated by hbm2java
 */
@Entity
@Table(name = "result", catalog = "project4")
public class Result implements java.io.Serializable {

	private ResultId id;
	private Account account;
	private Exam exam;
	private int score;
	private Date created;

	public Result() {
	}

	public Result(ResultId id, Account account, Exam exam, int score, Date created) {
		this.id = id;
		this.account = account;
		this.exam = exam;
		this.score = score;
		this.created = created;
	}

	@EmbeddedId

	@AttributeOverrides({
			@AttributeOverride(name = "username", column = @Column(name = "username", nullable = false, length = 50)),
			@AttributeOverride(name = "examId", column = @Column(name = "exam_id", nullable = false)) })
	public ResultId getId() {
		return this.id;
	}

	public void setId(ResultId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "username", nullable = false, insertable = false, updatable = false)
	public Account getAccount() {
		return this.account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "exam_id", nullable = false, insertable = false, updatable = false)
	public Exam getExam() {
		return this.exam;
	}

	public void setExam(Exam exam) {
		this.exam = exam;
	}

	@Column(name = "score", nullable = false)
	public int getScore() {
		return this.score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created", nullable = false, length = 19)
	public Date getCreated() {
		return this.created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

}