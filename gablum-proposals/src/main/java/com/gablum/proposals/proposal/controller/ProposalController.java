package com.gablum.proposals.proposal.controller;

import com.gablum.proposals.proposal.ProposalRabbit.ProposalInterfaceRabbit;
import com.gablum.proposals.proposal.model.JwtPayload;
import com.gablum.proposals.proposal.model.Proposal;
import com.gablum.proposals.proposal.service.ProposalService;
import com.gablum.proposals.proposal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class    ProposalController {

    public MessageChannel messageChannel;

    @Autowired
    private ProposalService proposalService;

    @Autowired
    private UserService userService;


    public ProposalController(ProposalInterfaceRabbit proposalInterface) {
        messageChannel = proposalInterface.newProposalMessageChannel();
    }

    @PostMapping("/proposals")                                 // Add proposal details
    public ResponseEntity<Proposal> addProposal(@RequestBody Proposal proposalData, HttpServletRequest request) {
        //FIXME: ensure it is a buyer floating a proposal
        String email = userService.getEmail(request);
        JwtPayload payload = userService.getJwtPayload(request);
        List<String> roles = payload.getAuth();
        boolean isBuyer = false;
        for (String role: roles) {
            if (role.contains("buyer")) {
                isBuyer = true;
            }
        }
        if (!isBuyer) {
            return new ResponseEntity<>(
                    HttpStatus.FORBIDDEN
            );
        }
        proposalData.setCreatedBy(email);
        proposalData.setUpdatedBy(email);
        proposalData.setCreatedOn(new Date());
        proposalData.setUpdatedOn(new Date());
        proposalData.setAuctionStarted(false);
        Proposal savedProposal = proposalService.addProposals(proposalData);

        Message<Proposal> msg = MessageBuilder.withPayload(proposalData).build();
        messageChannel.send(msg);
        return new ResponseEntity<>(
                savedProposal,
                HttpStatus.OK
        );
    }

    @GetMapping("/proposals/{proposalId}")                  // Get proposal details by Id
    public ResponseEntity<Proposal> getProposalById(
            @PathVariable("proposalId") String proposalId,
            HttpServletRequest request) {
        //FIXME: only seller can view another proposal// FIXED
        List<String> roles = userService.getJwtPayload(request).getAuth();
        boolean isSeller = false;
        for(String role: roles) {
            if (role.contains("seller")) {
                isSeller = true;
            }
        }
        if (isSeller) {
            return new ResponseEntity<Proposal>(
                    proposalService.getProposalById(proposalId),
                    HttpStatus.OK);
        }
        return new ResponseEntity<Proposal>(
                new Proposal(),
                HttpStatus.FORBIDDEN);
    }

    @GetMapping("/proposals")
    public List<Proposal> getProposals(@RequestParam Map<String, String> queryMap, HttpServletRequest request) {
        // Message<Proposal> msg = MessageBuilder.withPayload("helloo world from proposal's rabbit").build();
        // messageChannel.send(msg);
        String email = userService.getEmail(request);
        return proposalService.getAllProposals(queryMap, email);
    }

    @DeleteMapping("/proposals/{proposalId}")                                      //Delete Proposal
    public void deleteProposalbyID(@PathVariable("proposalId") String proposalId) {
        proposalService.deleteProposalbyID(proposalId);
    }

    //Extending the proposal
    @PatchMapping("proposals/{proposalId}")
    public ResponseEntity<Proposal> extendedProposal(
            @RequestBody Proposal modifiedProposal, @PathVariable("proposalId") String proposalId) {
        Proposal proposal = proposalService.getProposalById(proposalId);
        if (proposal == null) {
            return new ResponseEntity<Proposal>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Proposal>(
                proposalService.extendProposal(modifiedProposal, proposalId),
                HttpStatus.OK
        );
    }

    @GetMapping("/proposals/browse")                   // All proposals irrespective of createdBy
    public ResponseEntity<List<Proposal>> browseProposals(@RequestParam Map<String, String> queryMap) {
        return new ResponseEntity<List<Proposal>>(
                proposalService.getAllProposals(queryMap),
                HttpStatus.OK
        );
    }

    @PatchMapping("/proposals")
    public ResponseEntity<Proposal> saveInterestedSeller(@RequestBody Proposal proposalInWhichAdditionIsDone, HttpServletRequest request) {
        String currentLoggedUserEmail = userService.getEmail(request);
        return new ResponseEntity<Proposal>(proposalService.saveInterestedSeller(currentLoggedUserEmail, proposalInWhichAdditionIsDone), HttpStatus.OK);
    }

    @GetMapping("/proposals/browse/{businessSubDomain}")
    public ResponseEntity<List<Proposal>> getProposalsBySubDomain(@RequestParam Map<String, String> queryMap, @PathVariable("businessSubDomain") String businessSubDomain) {
        return new ResponseEntity<List<Proposal>>(
                proposalService.getAllProposalsByBusinessSubDomain(queryMap, businessSubDomain),
                HttpStatus.OK
        );
    }

    @PatchMapping("/proposals/invite")
    public ResponseEntity<Proposal> saveInvitedSeller(@RequestBody Proposal updatedProposal, HttpServletRequest request) {
        // String currentLoggedUserEmail = userService.getEmail(request);
        return new ResponseEntity<Proposal>(proposalService.saveInvitedSeller(updatedProposal), HttpStatus.OK);
    }

    @PatchMapping("proposals/{proposalId}/auction-started")
    public ResponseEntity<Proposal> auctionStarted(@PathVariable("proposalId") String proposalId) {
//        System.out.println("PRRRRRRRRRRRROOOOOOOOPOOOOOOOSALSSSSSSS------------------------------->>>>>>>>>>>");
        return new ResponseEntity<Proposal>(
                proposalService.changeAuctionFlag(proposalId),
                HttpStatus.OK
        );
    }

    @PatchMapping("/proposals/views")
    public ResponseEntity<Proposal> saveSellerView(@RequestBody Proposal proposalInWhichAdditionIsDone, HttpServletRequest request) {
         String currentLoggedUserEmail = userService.getEmail(request);
        return new ResponseEntity<Proposal>(proposalService.saveSellerView(currentLoggedUserEmail, proposalInWhichAdditionIsDone), HttpStatus.OK);
    }


}