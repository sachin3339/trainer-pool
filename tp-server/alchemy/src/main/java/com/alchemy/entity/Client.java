package com.alchemy.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "alchemy_client")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Client extends BaseId {

    private static final long serialVersionUID = -1615361904182281533L;

    @Column(name = "name")
    private String name;

}
