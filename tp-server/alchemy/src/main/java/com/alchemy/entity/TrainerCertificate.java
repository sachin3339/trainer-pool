package com.alchemy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "alchemy_trainer_certificate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainerCertificate extends BaseId {

	private static final long serialVersionUID = 8723029044564507974L;

	@Column(name = "issue_date")
    private long issuedDate;

    @Column(name = "certificate_url")
    private String certificateurl;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "cerficate_id", referencedColumnName = "id")
	 private Certificate certificate;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "trainer_id", referencedColumnName = "id")
	private Trainer trainer;

}
