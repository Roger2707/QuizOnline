package com.demo.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.demo.config.services.AccountService;

@Configuration
@EnableGlobalMethodSecurity(
	    // securedEnabled = true,
	    // jsr250Enabled = true,
	    prePostEnabled = true)
public class SecurityConfiguration {

	@Autowired
	//private CustomUserService userService;
	private AccountService userService;

	@Autowired
	private JWTTokenHelper jWTTokenHelper;

	@Autowired
	private AuthenticationEntryPoint authenticationEntryPoint;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	  @Bean
	  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
	    return authConfig.getAuthenticationManager();
	  }
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().exceptionHandling()
		.authenticationEntryPoint(authenticationEntryPoint).and()
		.authorizeRequests((request) -> request.antMatchers("/api/v1/auth/login").permitAll())
				//.antMatchers(HttpMethod.OPTIONS, "/**").permitAll().anyRequest().authenticated())
				//.antMatchers("/api/account/**").permitAll()) 
				
		.addFilterBefore(new JWTAuthenticationFilter(userService, jWTTokenHelper),
				UsernamePasswordAuthenticationFilter.class);

		http.csrf().disable().cors().and().headers().frameOptions().disable();
		
		 return http.build();
	}

}
