package com.alchemy.to;

import java.io.Serializable;

import com.alchemy.value.AlchemyEnums;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TrainingDetailsTO extends BaseTO{

	private static final long serialVersionUID = 7439236352322273096L;
	private String trainingName;
	private String companyName;
	private String location;
	private double rating;
	private long to;
	private long from;
}
