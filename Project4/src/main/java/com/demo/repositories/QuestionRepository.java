package com.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.models.Exam;
import com.demo.models.LeverInfo;
import com.demo.models.Question;
import com.demo.models.QuestionInfo;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Integer> {
	@Query("select new com.demo.models.QuestionInfo(questionId, grade.gradeId, lever.id, subject.id, name, content, created, type, photo, status) from Question order by questionId desc")
	public List<QuestionInfo> findAllQuestionInfo();

	@Query("select new com.demo.models.QuestionInfo(questionId, grade.gradeId, lever.id, subject.id, name, content, created, type, photo, status) from Question where subject.id=:id")
	public List<QuestionInfo> findAllQuestionBySubject(@Param("id") int id);

	@Query("select new com.demo.models.QuestionInfo(questionId, grade.gradeId, lever.id, subject.id, name, content, created, type, photo, status) from Question where questionId=:id")
	public QuestionInfo findQuestionInfoById(@Param("id") int id);
	
	@Query("select new com.demo.models.QuestionInfo(questionId, grade.gradeId, lever.id, subject.id, name, content, created, type, photo, status) from Question where questionId=:id")
	public QuestionInfo findQuestionInfoBy(@Param("id") int id);
	
	@Query("select new com.demo.models.QuestionInfo(q.questionId, q.grade.gradeId, q.lever.id, q.subject.id, q.name, q.content, q.created,q.type,q.photo, q.status) from Exam e join e.questions q  where e.examId=:id")
	public List<QuestionInfo> findQuestionInfoByExam(@Param("id") int id);

	@Query("from Question where lever.leverId=:id and grade.gradeId = :idGrade and subject.subjectId= :idSubject")
	public List<Question> findQuestionLever(@Param("id") int id, @Param("idGrade") int idGrade,
			@Param("idSubject") int idSubject);
	@Query("from Question where questionId = :id")
	public Question findQuestion(@Param("id") int id);
	
	@Query("select count(*) from Question where lever.leverId =:id and grade.gradeId = :idGrade and subject.subjectId= :idSubject")
	public int countQuestion(@Param("id") int id, @Param("idGrade") int idGrade,
			@Param("idSubject") int idSubject);

	@Query("select count(*) from Question where subject.id=:id")
	public int countQuestionInSubject(@Param("id") int id);
}
