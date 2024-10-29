package com.epsi.workshop.goodMental.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class AccesPatientId implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "admin_id")
    private Integer adminId;

    @Column(name = "user_id")
    private Integer userId;

 // Default constructor
    public AccesPatientId() {
    }

    // All-args constructor
    public AccesPatientId(Integer adminId, Integer userId) {
        this.adminId = adminId;
        this.userId = userId;
    }

    // Getters and setters
    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AccesPatientId that = (AccesPatientId) o;
        return Objects.equals(adminId, that.adminId) &&
               Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(adminId, userId);
    }
}


