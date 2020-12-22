package com.alchemy.to;

import com.alchemy.value.AlchemyEnums;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseTO extends BaseTO {
    private String name;
    private String description;
    private AlchemyEnums.CourseStatus status;
    private String code;
    private long startTime;
    private long endTime;
    private double fees;
}
