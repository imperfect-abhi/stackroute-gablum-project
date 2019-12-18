package com.gablum.auction.auctions;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class Bid {
    private float price;
    private int creditPeriod;
    private boolean qaqcCertificate;
    private boolean typeOfSupply;
    private Date timeOfDelivery;

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getCreditPeriod() {
        return creditPeriod;
    }

    public void setCreditPeriod(int creditPeriod) {
        this.creditPeriod = creditPeriod;
    }

    public boolean isQaqcCertificate() {
        return qaqcCertificate;
    }

    public void setQaqcCertificate(boolean qaqcCertificate) {
        this.qaqcCertificate = qaqcCertificate;
    }

    public boolean isTypeOfSupply() {
        return typeOfSupply;
    }

    public void setTypeOfSupply(boolean typeOfSupply) {
        this.typeOfSupply = typeOfSupply;
    }

    public Date getTimeOfDelivery() {
        return timeOfDelivery;
    }

    public void setTimeOfDelivery(Date timeOfDelivery) {
        this.timeOfDelivery = timeOfDelivery;
    }

}
