package com.demo.services;

import java.util.List;



import com.demo.models.Account;
import com.demo.models.AccountInfo;
import com.demo.models.ChangePassword;

public interface AccountService  {
     public List<AccountInfo> findAll();
     public Iterable<Account> findAllTest();
     public boolean save(Account account, int check);
     public boolean updateAvatar(String username,String account);
     public int changePassword(ChangePassword changePassword);
     public int resetPassword(String resetPass);
     public int changeStatus(String username, int check);
     public boolean delete(int id);
     public Account findById(int id);
     public List<AccountInfo> findByClass(int id);
     public Account findByUsername(String name);
     public AccountInfo findByIdInfo(int id);
     public AccountInfo findByUsernameInfo(String name);
     
}
