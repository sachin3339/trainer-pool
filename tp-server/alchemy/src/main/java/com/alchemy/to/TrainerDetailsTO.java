package com.alchemy.to;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TrainerDetailsTO extends BaseTO{

	private static final long serialVersionUID = 7439236352322273096L;
	private String firstName;
	private String lastName;
}
