package com.gablum.auction.auctions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class AuctionService implements IAuctionService{

    @Autowired
    private AuctionRepo auctionRepo;



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
    public List<Auction> getAllAuctions(Map<String, String> queryMap) {
        return auctionRepo.findAll(getPageable(queryMap)).getContent();
    }

    public List<Auction> getAllAuctionsBuyer(Map<String, String> queryMap, String email) {
        return auctionRepo.findAllByCreatedByAndIsAuctionActiveAndIsAuctionFinished(getPageable(queryMap), email,
                true, false).getContent();
    }

    @Override
    public Auction getAuctionById(String auctionId) {
        return auctionRepo.findByAuctionId(auctionId).orElse(null);
    }

    @Override
    public List<Auction> addAuctions(List<Auction> auctionToAdd) {
        return auctionRepo.saveAll(auctionToAdd);
    }

    public Auction addAuction(Auction auction){
//        auction.setAuctionActive(true);
        return auctionRepo.save(auction);
    }
    public List<Auction> getAuctionSeller(Map<String, String> queryMap, String email) {
        return auctionRepo.findAllByInvitedUsersEmailContainingAndIsAuctionActiveAndIsAuctionFinished(getPageable(queryMap), email,
                true, false).getContent();
    }
    @Override
    public Auction startAuction(String auctionId, String uniqueLink) {
        Auction auctionToStart = auctionRepo.findByAuctionId(auctionId).orElse(null);
        if (auctionToStart == null) {
            log.error("can't find auction with id: " + auctionId);
            return null;
        }
        auctionToStart.setAuctionActive(true);
        auctionToStart.setUniqueLink(uniqueLink);
        return auctionRepo.save(auctionToStart);
    }


    public Auction updateAuction(Auction auction) {
        return auctionRepo.save(auction);
    }

    public List<Auction> getOldAuctionsBuyerService(Map<String, String> queryMap, String email){
        return auctionRepo.findAllByCreatedByAndIsAuctionActiveAndIsAuctionFinished(getPageable(queryMap), email,
                true, true).getContent();
    }
}
