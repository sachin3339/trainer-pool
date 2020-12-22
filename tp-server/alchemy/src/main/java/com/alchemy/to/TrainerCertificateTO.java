package com.alchemy.to;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TrainerCertificateTO extends BaseTO {

    private long issuedDate;
    private String certificateurl;
    private CertificateTO certificate;
    private TrainerDetailsTO trainer;
    
}
