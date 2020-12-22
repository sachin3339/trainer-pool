package com.alchemy.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "alchemy_trainer_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumnentStorageProperties extends BaseId {

    private static final long serialVersionUID = 4308819208222377359L;

    @Column(name = "trainer_id")
    private Integer trainerId;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "upload_dir")
    private String uploadDir;

}
