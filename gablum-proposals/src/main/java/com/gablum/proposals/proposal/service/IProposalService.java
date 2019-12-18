package com.gablum.proposals.proposal.service;

import com.gablum.proposals.proposal.model.Proposal;

import java.util.List;
import java.util.Map;

public interface IProposalService {

    List<Proposal> getAllProposals();

    Proposal getProposalById(String proposalId);

    Proposal addProposals(Proposal proposalToAdd);

    Proposal extendProposal(Proposal proposal, String proposalId);

    List<Proposal> getAllProposals(Map<String, String> queryMap, String email);

    List<Proposal> getAllProposals(Map<String, String> queryMap);
}
