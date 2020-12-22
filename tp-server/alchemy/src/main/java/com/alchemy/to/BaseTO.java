package com.alchemy.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class BaseTO implements Serializable {
    private static final long serialVersionUID = -6446701411891454450L;
    private String sid;
}
