package com.alchemy.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
@Setter
@Getter
public class BaseId extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -3425831072868783122L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;
}
