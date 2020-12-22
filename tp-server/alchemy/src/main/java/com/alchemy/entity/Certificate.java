package com.alchemy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "alchemy_certificate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Certificate extends BaseId {

	private static final long serialVersionUID = 8665483644882692526L;

	@Column(name = "name")
    private String name;
	
	@Column(name = "issued_by")
    private String issuedBy;
    
	@OneToMany(mappedBy = "certificate", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<TrainerCertificate> trainerCertificates = new ArrayList<>();
}
