package com.gablum.proposals.proposal.repository;

import com.gablum.proposals.proposal.model.Proposal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProposalRepository extends MongoRepository<Proposal, String> {

    Optional<Proposal> findByProposalId(String proposalId);

    Page<Proposal> getAllProposalsByCreatedBy(String email, Pageable page);

    Page<Proposal> findAllByCreatedByAndAuctionStarted(Pageable pageable, String email, boolean isAuctionStarted);

    void deleteByProposalId(String proposalId);

    Page<Proposal> getAllProposalsByRegEndDateGreaterThanAndAuctionStarted(Pageable page, Date currentDate,
                                                                           boolean isAuctionStarted);

    List<Proposal> getAllProposalsByRegEndDateGreaterThanAndBusinessSubDomainAndAuctionStarted(
            Pageable page,
            Date currentDate,
            String businessSubDomain,
            boolean isAuctionStarted
    );

}
