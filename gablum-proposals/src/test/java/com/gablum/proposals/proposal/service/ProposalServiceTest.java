package com.gablum.proposals.proposal.service;

import com.gablum.proposals.proposal.model.Proposal;
import com.gablum.proposals.proposal.repository.ProposalRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@ExtendWith(SpringExtension.class)
class ProposalServiceTest {

    @Mock
    private ProposalRepository proposalRepository;

    @InjectMocks
    private ProposalService proposalService;

    private Proposal testProposal1 = new Proposal();
    private Proposal testProposal2 = new Proposal();

    @BeforeEach
    public void setUp() {
        testProposal1.setProposalId(UUID.randomUUID().toString());
        testProposal2.setProposalId(UUID.randomUUID().toString());

        //test Proposal1 details
        testProposal1.setRegStartDate(new Date(2019-06-12));
        testProposal1.setRegEndDate(new Date(2020-06-12));
    }

    @Test
    public void getAllProposals() {
        Mockito.when(proposalRepository.findAll()).thenReturn(List.of(testProposal1, testProposal2));

        Assertions.assertEquals(2, proposalService.getAllProposals().size(),
                "finds all proposals successfully");
    }

    @Test
    public void saveProposal() {
        Mockito.when(proposalRepository.save(testProposal1)).thenReturn(testProposal1);

        Assertions.assertEquals(testProposal1.getProposalId(), proposalService.saveProposal
                (testProposal1).getProposalId(), "the proposal is saved.");
    }

    @Test
    void getProposalById() {
        Mockito.when(proposalRepository.findByProposalId(testProposal1.getProposalId())).thenReturn
                (Optional.of(testProposal1));

        Assertions.assertEquals(testProposal1.getProposalId(), proposalService.getProposalById(
                testProposal1.getProposalId()).getProposalId(),"the proposal is being retrieved from their ID");
    }

    @Test
    void addProposals() {
        Mockito.when(proposalRepository.save(testProposal1)).thenReturn(testProposal1);

        Assertions.assertEquals(testProposal1.getProposalId(), proposalService.addProposals
                (testProposal1).getProposalId(),"the proposal is added");
    }
}