package com.gablum.usermanagement.user.controller;

import com.gablum.usermanagement.user.model.othermodels.Auction;
import com.gablum.usermanagement.user.model.othermodels.Proposal;
import com.gablum.usermanagement.user.model.othermodels.BidMessage;
import com.gablum.usermanagement.user.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class MailController {
    @Autowired
    MailService mailService;

    public void sendingProposalMail(Proposal proposal){
        mailService.sendProposalEmail("newProposal", proposal);
    }

    public void sendingAuctionMail(Auction auction) {
        mailService.sendAuctionEmail("newAuction", auction);
    }

    public void sendingBidMail(BidMessage bidMessage) {
        mailService.sendBidEmail("newBid", bidMessage);
    }
}
