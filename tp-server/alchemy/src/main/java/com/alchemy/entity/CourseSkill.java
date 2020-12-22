package com.alchemy.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "alchemy_courses_skill")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseSkill {


    @EmbeddedId
    CourseSkillPK courseSkillPK;

    @JoinColumn(name = "skill_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Skill skill;

    @JoinColumn(name = "course_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Course course;

}
