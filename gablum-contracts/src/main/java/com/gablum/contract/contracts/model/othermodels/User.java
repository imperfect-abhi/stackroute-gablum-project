package com.gablum.contract.contracts.model.othermodels;

import com.gablum.contract.contracts.model.Block;
import lombok.*;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    private String _id;
    private String name;
    private String email;
    private String password;
    private String address;
    private String phone;
    private String companyName;
    private String userName;
    private String businessLicense;
    private String businessDomain;
    private String businessSubDomain;
    private List<Map<String, List<String>>> userDomainDetails;
    private Map<String, String> hashEncryptionKeyList;
    private List<Block> blockchain;
    private List<String> contractIdList;
    private List<String> proposalIdList;
    private List<String> auctionIdList;
    private List<String> bidIdList;
    public void addDomainDetails(String domain, String subDomain){
        if(domain == null){
            domain = "Agriculture";
        }
        List<String> newDetails = new ArrayList<String>();
        newDetails.add(subDomain);
        Map<String, List<String>> singleDomainDetails = new HashMap<>();
        singleDomainDetails.put(domain, newDetails);
        userDomainDetails.add(singleDomainDetails);
    }
    private Set<Role> role = Set.of(new Role(1, "buyer"));
    private Integer active=1;
    private boolean isLocked=false;
    private boolean isExpired=false;
    private boolean isEnabled=true;
    private float rating;

    private Date createdOn;

    public boolean isLocked() {
        return isLocked;
    }

    public void setLocked(boolean locked) {
        isLocked = locked;
    }

    public boolean isExpired() {
        return isExpired;
    }

    public void setExpired(boolean expired) {
        isExpired = expired;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }
}