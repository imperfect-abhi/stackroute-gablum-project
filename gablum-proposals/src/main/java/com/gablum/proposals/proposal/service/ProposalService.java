package com.gablum.proposals.proposal.service;

import com.gablum.proposals.proposal.model.Proposal;
import com.gablum.proposals.proposal.repository.ProposalRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Getter
@Setter
@Service
public class ProposalService implements IProposalService {

    @Autowired
    private ProposalRepository proposalRepo;

    private List<Proposal> proposals;

    private Pageable getPageable(Map<String, String> queryMap) {
        String sortKey = "createdOn";
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

    // get all proposals
    @Override
    public List<Proposal> getAllProposals() {
        return proposalRepo.findAll();
    }

    public Proposal saveProposal(Proposal proposal) {
        return proposalRepo.save(proposal);
    }

    // get proposal by ID
    @Override
    public Proposal getProposalById(String proposalId) {
        return proposalRepo.findByProposalId(proposalId).orElse(null);
    }

    // adding proposals
    @Override
    public Proposal addProposals(Proposal proposalToAdd) {
        return proposalRepo.save(proposalToAdd);
    }

    public void deleteProposalbyID(String proposalId) {
        proposalRepo.deleteByProposalId(proposalId);
    }

    // extend Proposal
    public Proposal extendProposal(Proposal modifiedProposal, String proposalId) {
        Proposal proposalToChange = getProposalById(proposalId);
        proposalToChange.setRegStartDate(modifiedProposal.getRegStartDate());
        proposalToChange.setRegEndDate(modifiedProposal.getRegEndDate());
        return proposalRepo.save(proposalToChange);
    }

    public Proposal changeAuctionFlag(String proposalId) {
        Proposal proposalToChange = getProposalById(proposalId);
        proposalToChange.setAuctionStarted(true);
        return proposalRepo.save(proposalToChange);
    }

    @Override
    public List<Proposal> getAllProposals(Map<String, String> queryMap, String email) {
        return proposalRepo.findAllByCreatedByAndAuctionStarted(getPageable(queryMap), email, false).getContent();
    }

    @Override
    public List<Proposal> getAllProposals(Map<String, String> queryMap) {
        return proposalRepo.getAllProposalsByRegEndDateGreaterThanAndAuctionStarted(
                getPageable(queryMap), new Date(), false
        ).getContent();
    }

    public List<Proposal> getAllProposalsByBusinessSubDomain (Map<String, String> queryMap, String businessSubDomain) {
        return proposalRepo.getAllProposalsByRegEndDateGreaterThanAndBusinessSubDomainAndAuctionStarted(getPageable(queryMap),new Date(),businessSubDomain, false);
       }

    public Proposal saveInterestedSeller(String currentLoggedUserEmail, Proposal proposalInWhichAdditionIsDone) {
        Proposal updatedProposal = getProposalById(proposalInWhichAdditionIsDone.getProposalId());
        updatedProposal.getInterestedUsersEmail().add(currentLoggedUserEmail);
        updatedProposal.setInterested(updatedProposal.getInterestedUsersEmail().size());
        return proposalRepo.save(updatedProposal);
    }

    public Proposal saveInvitedSeller(Proposal updatedProposal) {
//        Proposal updatedProposal = getProposalById(proposalInWhichAdditionIsDone.getProposalId());
        System.out.println("vahin" + updatedProposal);
//        updatedProposal.getInvitedUsersEmail().add(currentLoggedUserEmail);
        return proposalRepo.save(updatedProposal);
    }

    public Proposal saveSellerView(String currentLoggedUserEmail,  Proposal proposalInWhichAdditionIsDone) {
        Proposal updatedProposal = getProposalById(proposalInWhichAdditionIsDone.getProposalId());
        System.out.println("vahin" + updatedProposal);
        updatedProposal.getViewSellerEmails().add(currentLoggedUserEmail);
        return proposalRepo.save(updatedProposal);
    }
}