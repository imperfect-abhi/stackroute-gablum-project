package com.gablum.usermanagement.user.rabbit;

import com.gablum.usermanagement.user.controller.MailController;
import com.gablum.usermanagement.user.model.othermodels.Auction;
import com.gablum.usermanagement.user.model.othermodels.Proposal;
import com.gablum.usermanagement.user.model.othermodels.BidMessage;
import com.gablum.usermanagement.user.security.UserListService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
@Slf4j
@EnableBinding(IGmailRabbit.class)
public class GmailRabbitListener {

    @Autowired
    private MailController mailController;


    @Autowired
    private UserListService userListService;

    @StreamListener("newProposal")
    public void newProposal(Proposal proposal){

        userListService.postMessageToUserListChannel(proposal);
        mailController.sendingProposalMail(proposal);
    }

    @StreamListener("newAuction")
    public void newAuction(Auction auction){
        mailController.sendingAuctionMail(auction);
    }

    @StreamListener("newBid")
    public void newBid(BidMessage bidMessage){
        mailController.sendingBidMail(bidMessage);
    }
}
