package com.gablum.usermanagement.user.model.othermodels;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ScoreObject {
    float total;
    float deliveryScore;
    float priceScore;
    float creditScore;
    float qaqcScore;
    float typeScore;
}
