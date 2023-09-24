package com.demo.services;

import java.io.File;
import java.nio.file.Files;
import java.security.SecureRandom;
import java.util.Date;
import java.util.List;

import java.util.Random;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.mindrot.jbcrypt.BCrypt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.ResourceUtils;

import com.demo.models.Account;
import com.demo.models.AccountInfo;
import com.demo.models.ChangePassword;
import com.demo.repositories.AccountRepository;

@Repository
public class AccountServiceveImpl implements AccountService {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private MailService mailService;

	@Override
	public List<AccountInfo> findAll() {
		// TODO Auto-generated method stub
		return accountRepository.findAllAccountInfo();
	}

	@Override
	public boolean save(Account account, int check) {
		try {
			if (check == 0) {
				String low = "qwertyuiopasdfghjklzxcvbnm";
				String up = "QWERTYUIOPASDFGHJKLZXCVBNM";
				String pass = "";
				for (int i = 0; i < 10; i++) {
					int rand = (int) (3 * Math.random());
					switch (rand) {
					case 0:
						pass += String.valueOf((int) (0 * Math.random()));
						break;
					case 1:
						rand = (int) (low.length() * Math.random());
						pass += String.valueOf(low.charAt(rand));
						break;
					case 2:
						rand = (int) (up.length() * Math.random());
						pass += String.valueOf(up.charAt(rand));
						break;

					}
				}

				File file = ResourceUtils.getFile("classpath:email_content_security.txt");

				String content = new String(Files.readAllBytes(file.toPath()));
				content = content.replace("$userTerm", account.getUsername());
				content = content.replace("$passwordTerm", pass);
				account.setPassword(BCrypt.hashpw(pass, BCrypt.gensalt()));
				account.setCreated(new Date());
				account.setAvatar("avatar.png");
				String from = "dacvn0123@gmail.com";
				mailService.Send(from, account.getEmail(), "Send Account", content);
			} else if (check == 1) {
				Account ac = accountRepository.findByUsername(account.getUsername());
				account.setCreated(ac.getCreated());
			}

			accountRepository.save(account);
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}

	}

	@Override
	public boolean delete(int id) {
		try {
			// accountRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}

	}

	@Override
	public Account findById(int id) {
		// TODO Auto-generated method stub
		return accountRepository.findById(id).get();
	}

	@Override
	public Account findByUsername(String name) {
		// TODO Auto-generated method stub
		return accountRepository.findByUsername(name);
	}

	@Override
	public AccountInfo findByIdInfo(int id) {
		// TODO Auto-generated method stub
		return accountRepository.findByIdInfo(id);
	}

	@Override
	public AccountInfo findByUsernameInfo(String name) {
		// TODO Auto-generated method stub
		return accountRepository.findByUsernameInfo(name);
	}

	@Override
	public Iterable<Account> findAllTest() {
		// TODO Auto-generated method stub
		return accountRepository.findAll();
	}

	@Override
	public List<AccountInfo> findByClass(int id) {
		// TODO Auto-generated method stub
		return accountRepository.findByClass(id);
	}

	@Override
	public boolean updateAvatar(String username, String avatar) {
		try {
			Account account = accountRepository.findByUsername(username);
			account.setAvatar(avatar);
			accountRepository.save(account);
			return true;
		} catch (Exception e) {
			return false;
		}

	}

	@Override
	public int changePassword(ChangePassword changePassword) {
		try {
			Account account = accountRepository.findByUsername(changePassword.getUsername());
			boolean check = BCrypt.checkpw(changePassword.getPassword(), account.getPassword());
			if (check) {
				account.setPassword(BCrypt.hashpw(changePassword.getNewPass(), BCrypt.gensalt()));
				accountRepository.save(account);
				return 2;
			} else {
				return 0;
			}
		} catch (Exception e) {
			return 1;
		}

	}

	@Override
	public int resetPassword(String resetPass) {
		try {
			Account account = accountRepository.findByUsername(resetPass);
			String low = "qwertyuiopasdfghjklzxcvbnm";
			String up = "QWERTYUIOPASDFGHJKLZXCVBNM";
			String pass = "";
			for (int i = 0; i < 10; i++) {
				int rand = (int) (3 * Math.random());
				switch (rand) {
				case 0:
					pass += String.valueOf((int) (0 * Math.random()));
					break;
				case 1:
					rand = (int) (low.length() * Math.random());
					pass += String.valueOf(low.charAt(rand));
					break;
				case 2:
					rand = (int) (up.length() * Math.random());
					pass += String.valueOf(up.charAt(rand));
					break;

				}
			}

			File file = ResourceUtils.getFile("classpath:email_content_security.txt");

			String content = new String(Files.readAllBytes(file.toPath()));
			content = content.replace("$userTerm", account.getUsername());
			content = content.replace("$passwordTerm", pass);
			account.setPassword(BCrypt.hashpw(pass, BCrypt.gensalt()));
			String from = "dacvn0123@gmail.com";
			mailService.Send(from, account.getEmail(), "Send Account", content);
			accountRepository.save(account);
			return 1;
		} catch (Exception e) {
			return 0;
		}

	}

	@Override
	public int changeStatus(String username, int check) {

		try {
			Account account = accountRepository.findByUsername(username);
			if (check == 1) {
				File file = ResourceUtils.getFile("classpath:email_content_active.txt");

				String content = new String(Files.readAllBytes(file.toPath()));
				String from = "dacvn0123@gmail.com";
				mailService.Send(from, account.getEmail(), "Send Active", content);
				accountRepository.save(account);
			} else {
				File file = ResourceUtils.getFile("classpath:email_content_block.txt");

				String content = new String(Files.readAllBytes(file.toPath()));
				String from = "dacvn0123@gmail.com";
				mailService.Send(from, account.getEmail(), "Send Active", content);
				accountRepository.save(account);
			}

			return 1;
		} catch (Exception e) {
			return 0;
		}
	}
}
