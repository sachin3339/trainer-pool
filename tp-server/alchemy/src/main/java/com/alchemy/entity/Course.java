package com.alchemy.entity;

import com.alchemy.value.AlchemyEnums;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "alchemy_course")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Course extends BaseId {

    private static final long serialVersionUID = 8169440098228955213L;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AlchemyEnums.CourseStatus status;

    @Column(name = "code")
    private String code;

    @Column(name = "start_time")
    private long startTime;

    @Column(name = "end_time")
    private long endTime;

    @Column(name = "fees")
    private double fees;

	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<CourseTrainer> courseTrainers = new ArrayList<>();
}
