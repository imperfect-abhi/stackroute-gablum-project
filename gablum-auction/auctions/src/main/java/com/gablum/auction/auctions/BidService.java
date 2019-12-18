package com.gablum.auction.auctions;

import com.gablum.auction.auctions.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.gablum.auction.auctions.BidEvaluation.score;

@Slf4j
@Service
public class BidService implements IBidService {
    @Autowired
    private BidRepo bidRepo;

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private UserService userService;


    //review
    private Pageable getPageable(Map<String, String> queryMap) {
        String sortKey = "auctionName";
        int pageLength = 10;
        int page = 0;
        if (queryMap.containsKey("sort")) {
            sortKey = queryMap.get("sort");
        }
        if (queryMap.containsKey("pagesize")) {
            pageLength = Integer.parseInt(queryMap.get("pagesize"));
        }
        if (queryMap.containsKey("page")) {
            page = Integer.parseInt(queryMap.get("page"));
        }

        return PageRequest.of(page, pageLength, Sort.by(sortKey));
    }

    @Override
    public BidDataEntity addBid(BidDataEntity bidDataEntity) {
        return bidRepo.save(bidDataEntity);
    }

    @Override
    public List<BidDataEntity> getBids() {
        return bidRepo.findAll();
    }

    @Override
    public ScoreObject getBidScore(Bid bid, String auctionId) throws ParseException {
        Auction auction = auctionService.getAuctionById(auctionId);

        DateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
        Date d1 = new Date();
        String dt2 = auction.getProposal().getDeliveryDate();
        d1 = formatter2.parse(dt2);

        float pricespec = auction.getProposal().getPrice();
        Date timeOfDeliverySpec = d1;
        int creditPeriodSpec = auction.getProposal().getCreditPeriod();
        boolean qaqcCertificateSpec = auction.getProposal().isQualityCertification();
        boolean typeOfSupplySpec = auction.getProposal().isMethodOfSupply();
        int weightPrice = auction.getProposal().getPriceWeight();
        int weightTimeOfDelivery = auction.getProposal().getDeliveryDateWeight();
        int weightCreditPeriod = auction.getProposal().getCreditPeriodWeight();
        int weightQaqc = auction.getProposal().getQualityCertificationWeight();
        int weightTypeOfSupply = auction.getProposal().getMethodOfSupplyWeight();

        return score(bid.getPrice(), bid.getTimeOfDelivery(), bid.getCreditPeriod(),
                bid.isQaqcCertificate(),
                bid.isTypeOfSupply(),
                pricespec, timeOfDeliverySpec, creditPeriodSpec, qaqcCertificateSpec, typeOfSupplySpec,
                weightPrice, weightTimeOfDelivery, weightCreditPeriod, weightQaqc, weightTypeOfSupply);
    }

    public List<BidDataEntity> getbidsAuction (Map<String, String> queryMap, String id) {
        return bidRepo.findAllByAuctionId(getPageable(queryMap), id).getContent();
    }

    public List<BidDataEntity> getBidsAuction(String id) {
        return bidRepo.findAllByAuctionId(id);
    }

    public List<BidDataEntity> getBidsAuction(String id, HttpServletRequest request) {
        List<BidDataEntity> allBids = bidRepo.findAllByAuctionId(id);
        Collections.sort(
                allBids,
                (t2, t1) -> {
                    if (t2.getScoreObject().getTotal() < t1.getScoreObject().getTotal()) {
                        return 1;
                    }
                    else if (t2.getScoreObject().getTotal() > t1.getScoreObject().getTotal()) {
                        return -1;
                    }
                    return 0;
                }
        );

        for (int _i = 0; _i < allBids.size(); _i++) {
            allBids.get(_i).setRank(_i +1);
            allBids.get(_i).setPercentile(((float)(allBids.size() - _i))*100.0f/(allBids.size()));
        }
        Auction auction = auctionService.getAuctionById(id);
        String email = userService.getEmail(request);
        if (auction.getCreatedBy().equals(email)) {
            return allBids;
        }
        else {
            List<BidDataEntity> bidByThisSeller = new ArrayList<BidDataEntity>();
            for (BidDataEntity entity: allBids) {
                if (entity.getCreatedBy().equals(email)) {
                    bidByThisSeller.add(entity);
                }
            }
            return bidByThisSeller;
        }
    }

}


