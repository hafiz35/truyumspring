package com.cognizant.truyum.model;

public class User {
	private String username;
	private String firstname;
	private String lastname;
	private String password;

	public User() {
		super();
	}
	public User(String username, String firstName, String lastName, String password) {
		super();
		this.username = username;
		this.firstname = firstName;
		this.lastname = lastName;
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFirstName() {
		return firstname;
	}
	public void setFirstName(String firstName) {
		this.firstname = firstName;
	}
	public String getLastName() {
		return lastname;
	}
	public void setLastName(String lastName) {
		this.lastname = lastName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
