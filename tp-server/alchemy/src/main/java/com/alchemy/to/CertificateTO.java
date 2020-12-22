package com.alchemy.to;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CertificateTO extends BaseTO {
	
    private String name;
    private String issuedBy;
}
