package com.alchemy.to;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TopTrainersTO extends BaseTO {

    private String trainerName;
    private String email;
    private String designation;
    private String trainerImageUrl;
    private double avgRating;
}
