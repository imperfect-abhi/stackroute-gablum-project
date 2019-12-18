package com.gablum.usermanagement.user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class SignUpRequest {

    private String name;
    private String email;
    private String address;
    private long phone;
    private String companyName;
    private String username;
    private String businessLicense;
    private String password;
    public enum role {
        ADMIN, BUYER, SELLER
    }
    public enum domain {
        Agriculture, Textile, Others
    }
    public enum subDomain {
        RawMaterial, Equipments, Produce
    }

    public SignUpRequest() {
    }


}
