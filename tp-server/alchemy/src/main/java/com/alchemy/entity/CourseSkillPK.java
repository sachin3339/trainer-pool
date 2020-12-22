package com.alchemy.entity;

import lombok.*;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseSkillPK implements Serializable {

    private static final long serialVersionUID = -1615361904182281533L;

    @Basic(optional = false)
    @Column(name = "skiil_id")
    private int skillId;

    @Basic(optional = false)
    @Column(name = "course_id")
    private int courseId;
}
