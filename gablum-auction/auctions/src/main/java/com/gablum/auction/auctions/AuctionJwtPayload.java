package com.gablum.auction.auctions;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AuctionJwtPayload {
    private String sub;
    private String auctionId;

    @JsonProperty("isOwner")
    private boolean isOwner;

    private long iat;
    private long exp;
}
