package com.alchemy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "alchemy_references")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class References extends BaseId {
    private static final long serialVersionUID = -1615312904182285346L;

    @Column(name = "name")
    private String name;
}
