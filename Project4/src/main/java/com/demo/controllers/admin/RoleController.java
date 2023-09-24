package com.demo.controllers.admin;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.stereotype.Controller;

import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.demo.models.RoleInfo;
import com.demo.models.SubjectInfo;
import com.demo.services.RoleService;
import com.demo.services.SubjectService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/role")
public class RoleController {


	@Autowired
	private RoleService roleService;
	
	@RequestMapping(value = "findAllRole", method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RoleInfo>> findAllQuestion() {
		try {
			return new ResponseEntity<List<RoleInfo>>(roleService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<RoleInfo>>(HttpStatus.BAD_REQUEST);
		}
	}

	
	
	

}
