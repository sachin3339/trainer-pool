package com.alchemy.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "alchemy_admin")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin extends BaseId {
    private static final long serialVersionUID = -3279883227753498509L;

    @Column(name = "email")
    private String email;

}
