package com.alchemy.to;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TopTechnologyTO extends BaseTO {

    private String technologyName;
    private String description;
    private String imageLocation;
    private Integer courseCount;
}
