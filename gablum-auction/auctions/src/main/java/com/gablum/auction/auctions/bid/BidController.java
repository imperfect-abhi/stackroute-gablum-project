package com.gablum.auction.auctions.bid;

//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;

//import com.gablum.auction.auctions.BidService;
//import com.gablum.auction.auctions.Bid;
//import com.gablum.auction.auctions.AuctionService;
//import com.gablum.auction.auctions.Auction;
//import com.gablum.auction.auctions.BidDataEntity;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.stereotype.Controller;

//import java.text.DateFormat;
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.List;
//
//import static com.gablum.auction.auctions.BidEvaluation.score;

//@Slf4j
//@Controller
//public class BidController {
//
//    @Autowired
//    private SimpMessageSendingOperations messageSendingOperations;
//
//    @Autowired
//    private BidService bidService;
//
//    @Autowired
//    private AuctionService auctionService;


    // Getting score
//
//    @MessageMapping("/bids.getscore")
//    public String getBidScore(@Payload String message) throws JsonProcessingException, ParseException {
//        log.info("on /bids.getscore, message: " + message);
//
//        ObjectMapper mapper = new ObjectMapper();
//        Bid bid =  mapper.readValue(message, Bid.class);
//
//        String id = "3d5cb199-cc73-4831-8ce9-2894ee640472";
//        Auction auction = auctionService.getAuctionById(id);
//
//        DateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
//        Date d1 = new Date();
//        String dt2 = auction.getProposal().getDeliveryDate();
//        d1 = formatter2.parse(dt2);
//
//        float pricespec = auction.getProposal().getPrice();
//        Date timeOfDeliverySpec = d1;
//        int creditPeriodSpec = auction.getProposal().getCreditPeriod();
//        boolean qaqcCertificateSpec = auction.getProposal().isQualityCertificate();
//        boolean typeOfSupplySpec = auction.getProposal().isMethodOfSupply();
//        int weightPrice = auction.getProposal().getWeightPrice();
//        int weightTimeOfDelivery = auction.getProposal().getWeightTimeOfDelivery();
//        int weightCreditPeriod = auction.getProposal().getWeightCreditPeriod();
//        int weightQaqc = auction.getProposal().getWeightQaqcCertificate();
//        int weightTypeOfSupply = auction.getProposal().getWeightTypeOfDelivery();
//
//        float scorecnt = score(bid.getPrice(), bid.getTimeOfDelivery(), bid.getCreditPeriod(),
//                bid.isQaqcCertificate(),
//                bid.isTypeOfSupply(),
//                pricespec, timeOfDeliverySpec, creditPeriodSpec, qaqcCertificateSpec, typeOfSupplySpec,
//                weightPrice, weightTimeOfDelivery, weightCreditPeriod, weightQaqc, weightTypeOfSupply);
//        String message1 = "Bid score is " + scorecnt;
//        messageSendingOperations.convertAndSend(
//                "/topic/getscore",
//                message1
//        );
//
//
//        return message1;
//    }
//
//
////    Adding bids
//
//    @MessageMapping("/bids.addbid")
//    public String addNewBid(@Payload String message) throws JsonProcessingException, ParseException {
//        log.info("on /bids.addbid, message: " + message);
//
//        ObjectMapper mapper = new ObjectMapper();
//        Bid bid =  mapper.readValue(message, Bid.class);
//
//        String id = "3d5cb199-cc73-4831-8ce9-2894ee640472";
//        Auction auction = auctionService.getAuctionById(id);
//
//        DateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
//        Date d1 = new Date();
//        String dt2 = auction.getProposal().getDeliveryDate();
//        d1 = formatter2.parse(dt2);
//
//        float pricespec = auction.getProposal().getPrice();
//        Date timeOfDeliverySpec = d1;
//        int creditPeriodSpec = auction.getProposal().getCreditPeriod();
//        boolean qaqcCertificateSpec = auction.getProposal().isQualityCertificate();
//        boolean typeOfSupplySpec = auction.getProposal().isMethodOfSupply();
//        int weightPrice = auction.getProposal().getWeightPrice();
//        int weightTimeOfDelivery = auction.getProposal().getWeightTimeOfDelivery();
//        int weightCreditPeriod = auction.getProposal().getWeightCreditPeriod();
//        int weightQaqc = auction.getProposal().getWeightQaqcCertificate();
//        int weightTypeOfSupply = auction.getProposal().getWeightTypeOfDelivery();
//
//        float scorecnt = score(bid.getPrice(), bid.getTimeOfDelivery(), bid.getCreditPeriod(),
//                bid.isQaqcCertificate(),
//                bid.isTypeOfSupply(),
//                pricespec, timeOfDeliverySpec, creditPeriodSpec, qaqcCertificateSpec, typeOfSupplySpec,
//                weightPrice, weightTimeOfDelivery, weightCreditPeriod, weightQaqc, weightTypeOfSupply);
//
//        BidDataEntity bidDataEntity = new BidDataEntity();
//        bidDataEntity.setBid(bid);
//        bidDataEntity.setScore(scorecnt);
//
//        bidService.addBid(bidDataEntity);
//
//
//        String message2 = "Bid is stored, and score is " + scorecnt;
//
//        messageSendingOperations.convertAndSend(
//                "/topic/newbid",
//                message2
//        );
//
//        return message2;
//    }
//
//
//    //    fetching bids
//
//    @MessageMapping("/bids.fetchbid")
//    public String fetchBid(@Payload String message) throws JsonProcessingException {
//        log.info("on /bids.fetchbid, message: " + message);
//
//
//        String message3 = "List of bids \n";
//        List<BidDataEntity> bidList = bidService.getBids();
//        message3 = message3 + bidList;
//        messageSendingOperations.convertAndSend(
//                "/topic/fetchbid",
//                message3
//        );
//
//        return message3;
//    }
//
//
//
//}
