package com.gablum.auction.auctions.otherModels;

import com.gablum.auction.auctions.Auction;
import com.gablum.auction.auctions.BidDataEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.UUID;

@Getter @Setter @ToString
public class Contracts {
    private String _id;
    private String contractId;
    private String auctionId;
    private String bidId;
    private Auction auctionDetails;
    private BidDataEntity bidDetails;
    private String buyerEmail;
    private String buyerESign;
    private String sellerESign;
    private String sellerEmail;
    private Boolean contractStatus = true;
    private String currentHash;
    private String previousHash;
    private Date createdOn;

    public Contracts(String auctionId, String bidId, Auction auctionDetails, BidDataEntity bidDetails, String buyerEmail, String sellerEmail, Boolean contractStatus, String previousHash) {
        this.contractId = UUID.randomUUID().toString();
        this.auctionId = auctionId;
        this.bidId = bidId;
        this.auctionDetails = auctionDetails;
        this.bidDetails = bidDetails;
        this.buyerEmail = buyerEmail;
        this.sellerEmail = sellerEmail;
        this.contractStatus = contractStatus;
        this.generatingBuyerESign();
        this.generatingSellerESign();
        this.generatingCurrentHash();
        this.previousHash = previousHash;
        this.createdOn= new Date();
    }

    public void generatingBuyerESign(){
        String toBeUsedForHash = buyerEmail;
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(toBeUsedForHash.getBytes("UTF-8"));
            StringBuffer hexString =new StringBuffer();
            for (int i=0 ; i<hash.length; i++){
                String hex = Integer.toHexString(0xff & hash[i]);
                if (hex.length()==1){
                    hexString.append(0);
                }
                hexString.append(hex);
            }
            this.buyerESign = hexString.toString();

        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    public void generatingSellerESign(){
        String toBeUsedForHash = sellerEmail;

        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(toBeUsedForHash.getBytes("UTF-8"));
            StringBuffer hexString =new StringBuffer();
            for (int i=0 ; i<hash.length; i++){
                String hex = Integer.toHexString(0xff & hash[i]);
                if (hex.length()==1){
                    hexString.append(0);
                }
                hexString.append(hex);
            }
            this.sellerESign = hexString.toString();

        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    public void generatingCurrentHash(){
        String toBeUsedForHash = _id + auctionDetails.toStringContract()
                + bidDetails.toStringContract() + buyerEmail + sellerEmail + buyerESign
                + sellerESign + previousHash;
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(toBeUsedForHash.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();
            for (int i=0; i<hash.length; i++){
                String hex = Integer.toHexString(0xff & hash[i]);
                if(hex.length()==1){
                    hexString.append(0);
                }
                hexString.append(hex);
            }
            this.currentHash = hexString.toString();
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    public String toBeEncrypted(){
        return _id + contractId + auctionId + bidId + auctionDetails.toStringContract()
                + bidDetails.toStringContract() + buyerEmail + sellerEmail;
    }
}
