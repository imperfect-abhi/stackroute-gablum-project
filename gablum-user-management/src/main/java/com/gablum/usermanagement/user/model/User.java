package com.gablum.usermanagement.user.model;

import com.gablum.usermanagement.user.model.othermodels.Block;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document("users")
public class User {

    @Id
    private String _id;
    @NotEmpty(message = "*Please provide your name")
    private String name;
    @Email(message = "*Please provide a valid email")
    @NotEmpty(message = "*Please provide an email")
    private String email;
    private String password;
    private String address;
    private String phone;
    private String companyName;
    private String userName;
    private String businessLicense;
    private String businessDomain = "Agriculture";
    private String businessSubDomain;
    private String profileImage;
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
    private float rating;

    // TODO: remove hard coded role: DONE
    private Integer active=1;
    private boolean isLocked=false;
    private boolean isExpired=false;
    private boolean isEnabled=true;

    private Date createdOn = new Date();

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
