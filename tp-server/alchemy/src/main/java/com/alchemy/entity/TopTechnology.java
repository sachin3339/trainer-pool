package com.alchemy.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "top_technology")
@Getter
@Setter
@NoArgsConstructor
public class TopTechnology extends BaseEntity {

	private static final long serialVersionUID = -7673145241097159013L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    
	@Column(name = "name")
    private String technologyName;
	
	@Column(name = "description")
    private String description;

    @Column(name = "image_location")
    private String imageLocation;

    @Column(name = "course_count")
    private Integer courseCount;
}
