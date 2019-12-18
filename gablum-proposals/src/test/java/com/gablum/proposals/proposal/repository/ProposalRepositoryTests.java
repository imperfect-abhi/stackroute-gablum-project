package com.gablum.proposals.proposal.repository;

import com.gablum.proposals.proposal.model.Proposal;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class ProposalRepositoryTests {

    @Autowired
    private ProposalRepository proposalRepository;

    private Proposal testProposal1 = new Proposal();
    private Proposal testProposal2 = new Proposal();

    @BeforeEach
    public void setUp () {
        //proposal 1 details
        testProposal1.setPrice((float)21.75);
        testProposal1.setThresholdParticipants(10);
        testProposal1.setInterested(12);

        //proposal 2 details
        testProposal1.setPrice((float) 347.50);
        testProposal2.setThresholdParticipants(23);
        testProposal2.setInterested(35);

        List <Proposal> proposalList = List.of(testProposal1, testProposal2);
    }

    @AfterEach
    public void removeEntities() {
        proposalRepository.deleteAll();
    }

    @Test
    public void dbCanStore() {
        Assertions.assertEquals(
                2,
                proposalRepository.saveAll(
                        List.of(testProposal1, testProposal2)).size(), "DB should be able to store all"
        );
    }

    @Test
    public void dbCanFetchAll() {
        proposalRepository.saveAll(List.of(testProposal1, testProposal2));
        Assertions.assertEquals(2, proposalRepository.findAll().size(),
                "DB can store and fetch all elements");
    }
}

