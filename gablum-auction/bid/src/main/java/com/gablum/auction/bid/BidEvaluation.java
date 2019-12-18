package com.gablum.auction.bid;


import java.util.Date;

public class BidEvaluation {
    public static void main(String[] args) {
        float price = 400;
        Date timeOfDelivery = new Date(15);
        int creditPeriod = 1;
        boolean qaqccertification = true;
        boolean typeOfSupply = true;

        float priceSpec = 400;
        Date timeOfDeliverySpec = new Date(15);
        int creditPeriodSpec = 1;
        boolean qaqccertificationSpec = true;
        boolean typeOfSupplySpec = true;

        float weightPriceSpec = 1;
        float weightTimeOfDeliverySpec = 5;
        float weightCreditPeriodSpec = 1;
        float weightQaqcCertificationSpec = 1;
        float weightTypeOfSupplySpec = 1;

        double scorecnt = score(price, timeOfDelivery, creditPeriod, qaqccertification, typeOfSupply,
                priceSpec, timeOfDeliverySpec, creditPeriodSpec, qaqccertificationSpec, typeOfSupplySpec,
                weightPriceSpec,
                weightTimeOfDeliverySpec, weightCreditPeriodSpec, weightQaqcCertificationSpec, weightTypeOfSupplySpec);
        System.out.println("score------------->" + scorecnt);
    }

    public static float score(float price, Date timeOfDelivery, int creditPeriod, boolean qaqcCertificate,
                              boolean typeOfSupply,
                              float priceSpec, Date timeOfDeliverySpec, int creditPeriodSpec,
                              boolean qaqcCertificateSpec,
                              boolean typeOfSupplySpec,
                              float weightPriceSpec, float weightTimeOfDeliverySpec, float weightCreditPeriodSpec,
                              float weightQaqcCertificateSpec,
                              float weightTypeOfSupplySpec) {
        float score;

        float percentWeightPriceSpec =
                100*weightPriceSpec/(weightPriceSpec + weightTimeOfDeliverySpec + weightCreditPeriodSpec
                        + weightQaqcCertificateSpec + weightTypeOfSupplySpec);
        float percentWeightTimeOfDeliverySpec =
                100*weightTimeOfDeliverySpec/(weightPriceSpec + weightTimeOfDeliverySpec + weightCreditPeriodSpec
                + weightQaqcCertificateSpec + weightTypeOfSupplySpec);
        float percentWeightCreditPeriodSpec =
                100*weightCreditPeriodSpec/(weightPriceSpec + weightTimeOfDeliverySpec + weightCreditPeriodSpec
                        + weightQaqcCertificateSpec + weightTypeOfSupplySpec);
        float percentWeightQaqcCertificationSpec =
                100*weightQaqcCertificateSpec/(weightPriceSpec + weightTimeOfDeliverySpec + weightCreditPeriodSpec
                        + weightQaqcCertificateSpec + weightTypeOfSupplySpec);
        float percentWeightTypeOfSupplySpec =
                100*weightTypeOfSupplySpec/(weightPriceSpec + weightTimeOfDeliverySpec + weightCreditPeriodSpec
                        + weightQaqcCertificateSpec + weightTypeOfSupplySpec);

        float priceNorm = (price - priceSpec) / priceSpec;
        float timeOfDeliveryNorm =
                (-(float)timeOfDelivery.getTime() + (float)timeOfDeliverySpec.getTime()) / ((float)timeOfDeliverySpec.getTime());
        float creditPeriodNorm = (creditPeriod - creditPeriodSpec) / (float)creditPeriodSpec;
        System.out.println(creditPeriodNorm);
        float certificationNorm = 0;
        float typeOfSupplyNorm = 0;


        if (qaqcCertificateSpec == true && qaqcCertificate == false) {
            certificationNorm = -1;
        }
        if (qaqcCertificateSpec == true && qaqcCertificate == true) {
            certificationNorm = 0;
        }

        if (typeOfSupplySpec == true && typeOfSupply == false) {
            typeOfSupplyNorm = -1;
        }
        if (typeOfSupplySpec == true && typeOfSupply == true) {
            typeOfSupplyNorm = 0;
        }

        score =
                percentWeightPriceSpec * priceNorm
                        + percentWeightTimeOfDeliverySpec * timeOfDeliveryNorm
                        + percentWeightCreditPeriodSpec * creditPeriodNorm
                        + percentWeightQaqcCertificationSpec * certificationNorm
                        + percentWeightTypeOfSupplySpec*typeOfSupplyNorm;

        return score;
    }

}



