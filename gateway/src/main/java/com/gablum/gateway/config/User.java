package com.gablum.gateway.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("users")
public class User {

    private UUID userId;
    @NotEmpty(message = "*Please provide your name")
    private String name;
    @Email(message = "*Please provide a valid email")
    @NotEmpty(message = "*Please provide an email")
    private String email;
    private String password;
    private String address;
    private long phone;
    private String businessLicense;

    public enum role {
        ADMIN, BUYER, SELLER
    }
    public enum domain {
        Agriculture, Textile, Others
    }
    public enum subDomain {
        RawMaterial, Equipments, Produce
    }
    private Set<Role> role = Set.of(new Role(1, "user"));
    // TODO: remove hard coded role
    private Integer active=1;
    private boolean isLocked=false;
    private boolean isExpired=false;
    private boolean isEnabled=true;


    public boolean isLocked() {
        return isLocked;
    }

    public void setLocked(boolean loacked) {
        isLocked = loacked;
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
