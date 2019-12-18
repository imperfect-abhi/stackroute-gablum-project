package com.gablum.usermanagement.user.services;
import com.gablum.usermanagement.user.model.User;
import com.gablum.usermanagement.user.model.othermodels.Auction;
import com.gablum.usermanagement.user.model.othermodels.Proposal;
import com.gablum.usermanagement.user.model.othermodels.BidMessage;
import com.gablum.usermanagement.user.model.othermodels.BidDataEntity;
import com.gablum.usermanagement.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserRepository userRepository;

    public void sendEmail(String type, User user){
        SimpleMailMessage msg = new SimpleMailMessage();
        if (type == "registering"){
            msg.setTo(user.getEmail());
            msg.setSubject("User Email verification.");
            String text = "Hello "+user.getName()+", from "+user.getCompanyName()+".\n";
            text += "\nWelcome to Gablum!!\nThanks for choosing us for your business.";
            text += "\nGet started by logging in to your profile";
            text += "\n\nYou can now connect with businesses that best suit your expectations.\nIn case of " +
                    "any query you can connect with our support team once you login.";
            text += "\n\nSee you online.\n\nTeam Gablum.";
            msg.setText(text);
            try
            {
                javaMailSender.send(msg);
            } catch (MailException e){
                System.out.println("Wrong email provided");
                e.printStackTrace();
            }
        }
    }

    public void sendProposalEmail(String type, Proposal proposal) {
        log.warn("mail proposal--->", proposal.toString());
        SimpleMailMessage msg = new SimpleMailMessage();
        if(type == "newProposal") {
            msg.setTo(proposal.getCreatedBy());

            msg.setSubject("New Proposal Added");

            String textBuyer = "Thanks for floating a new proposal on Gablum.";
            textBuyer += "We hope to provide you with the best pool of suppliers inline with your proposal.\n";
            textBuyer += "\n\nProposal Details are : \n";
            textBuyer += "\nProduct Name : " + proposal.getProductName();
            textBuyer += "\nDomain : " + proposal.getBusinessDomain();
            textBuyer += "\nSubDomain : " + proposal.getBusinessSubDomain();
            textBuyer += "\nQuantity : " + proposal.getQuantityValue() + proposal.getQuantityUnit();
            textBuyer += "\nDelivery : " + proposal.getDeliveryDate();
            textBuyer += "\nRegistration Start Date : " + proposal.getRegStartDate();
            textBuyer += "\nAuction Start Date : " + proposal.getAuctionStartDate();
            textBuyer += "\n\nSimply visit your account dashboard if you wish to make changes to your floated proposal.";
            textBuyer += "\nTeam Gablum";
            msg.setText(textBuyer);

            try {
                javaMailSender.send(msg);
            } catch (MailException e) {
                System.out.println("Wrong email provided");
                e.printStackTrace();
            }

            List<User> subDomainUsers = new ArrayList<>(userRepository.findAllByBusinessSubDomain(proposal.getBusinessSubDomain()));
            for (int i=0; i<subDomainUsers.size(); i++){
                SimpleMailMessage msgForSeller = new SimpleMailMessage();
                msgForSeller.setTo(subDomainUsers.get(i).getEmail());

                msgForSeller.setSubject("New Proposal Added of " + proposal.getBusinessSubDomain() + " Busniess Sub Domain");

                String textSeller = "Hi " + subDomainUsers.get(i).getName();
                textSeller += "\n A new proposal has been floated which might be of your interest. Please, look at brief of the proposal below." +
                        "You can find more details in 'Active Proposal' in your dashboard and express interest.\n";
                textSeller += "\n\nProposal Details are : \n";
                textSeller += "\nProduct Name : " + proposal.getProductName();
                textSeller += "\nDomain : " + proposal.getBusinessDomain();
                textSeller += "\nSubDomain : " + proposal.getBusinessSubDomain();
                textSeller += "\nQuantity : " + proposal.getQuantityValue() + proposal.getQuantityUnit();
                textSeller += "\nDelivery : " + proposal.getDeliveryDate();
                textSeller += "\nRegistration Start Date : " + proposal.getRegStartDate();
                textSeller += "\nAuction Start Date : " + proposal.getAuctionStartDate();
                textSeller += "\n\nVisit your account dashboard if you wish to express interest in floated proposal.";
                textSeller += "\nTeam Gablum";
                msgForSeller.setText(textSeller);

                try {
                    javaMailSender.send(msgForSeller);
                } catch (MailException e) {
                    System.out.println("Wrong email provided");
                    e.printStackTrace();
                }
            }
        }
    }


    public void sendAuctionEmail(String type, Auction auction) {
        SimpleMailMessage msg = new SimpleMailMessage();
        if (type == "newAuction"){
            msg.setTo(auction.getCreatedBy());
            msg.setSubject("New Auction Floated");
            String textBuyer = "You have initialised a new Auction.\n";
            textBuyer += "We hope to provide you with the best pool of suppliers inline with your proposal.\n";
            textBuyer += "Stay up to date while the auction runs and choose the bid of your" +
                    " choice to award the contract to the suitable supplier.\n";
            textBuyer += "Do read the instructions carefully before you award the contract.";
            textBuyer += "\n\nTeam Gablum.";
            msg.setText(textBuyer);
            try
            {
                javaMailSender.send(msg);
            } catch (MailException e){
                System.out.println("Wrong email provided");
                e.printStackTrace();
            }

            List<String> interestedUsersEmail = new ArrayList<String>();
            interestedUsersEmail = auction.getInterestedUsersEmail();

            for (int i=0; i<interestedUsersEmail.size(); i++){
                SimpleMailMessage msgInterestedUsers = new SimpleMailMessage();
                msgInterestedUsers.setText(interestedUsersEmail.get(i));
                msgInterestedUsers.setSubject("New Auction Floated");
                String textSeller = "New Auction of your interested has been floated\n";
                textSeller += "Place your bids wisely. All the best.\n";
                textSeller += "\n\n\nTeam Gablum";
                msgInterestedUsers.setText(textSeller);
                try
                {
                    javaMailSender.send(msgInterestedUsers);
                } catch (MailException e){
                    System.out.println("Wrong email provided");
                    e.printStackTrace();
                }
            }
        }
    }

    public void sendBidEmail(String type, BidMessage bidMessage) {
        SimpleMailMessage msg = new SimpleMailMessage();
        if (type == "newBid"){
            BidDataEntity bidDataEntity = bidMessage.getBidDataEntity();
            msg.setTo(bidDataEntity.getCreatedBy());
            msg.setSubject("New Bid Placed");
            String text = "You have placed a new bid. "+bidDataEntity.getCreatedBy();
            msg.setText(text);
            try
            {
                javaMailSender.send(msg);
            } catch (MailException e){
                System.out.println("Wrong email provided");
                e.printStackTrace();
            }
        }
    }

}
