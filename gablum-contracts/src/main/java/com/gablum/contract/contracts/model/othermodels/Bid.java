package com.gablum.contract.contracts.model.othermodels;

import lombok.*;

import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Bid {
    private float price;
    private int creditPeriod;
    private boolean qaqcCertificate;
    private boolean typeOfSupply;
    private Date timeOfDelivery;
}
