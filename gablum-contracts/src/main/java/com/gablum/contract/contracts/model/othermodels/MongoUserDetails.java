package com.gablum.contract.contracts.model.othermodels;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class MongoUserDetails implements UserDetails {

    private String username;
    private String BCryptPassword;
    private Integer active;
    private boolean isLocked;
    private boolean isExpired;
    private boolean isEnabled;
    private List<GrantedAuthority> grantedAuthorities;

    @Override
    public String toString() {
        return "MongoUserDetails{" +
                "username='" + username + '\'' +
                ", BCryptPassword='" + BCryptPassword + '\'' +
                ", active=" + active +
                ", isLocked=" + isLocked +
                ", isExpired=" + isExpired +
                ", isEnabled=" + isEnabled +
                ", grantedAuthorities=" + grantedAuthorities +
                '}';
    }

    public MongoUserDetails(String username, String BCryptPassword, Integer active, boolean isLocked, boolean
            isExpired, boolean isEnabled, String [] authorities) {
        this.username = username;
        this.BCryptPassword = BCryptPassword;
        this.active = active;
        this.isLocked = isLocked;
        this.isExpired = isExpired;
        this.isEnabled = isEnabled;
        this.grantedAuthorities = AuthorityUtils.createAuthorityList(authorities);
    }

    public MongoUserDetails(String username,  String [] authorities) {
        this.username = username;
        this.grantedAuthorities = AuthorityUtils.createAuthorityList(authorities);
    }

    public MongoUserDetails() {
        super();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return BCryptPassword;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return active==1;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !isExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public void setPassword(String BCryptPassword) {
        this.BCryptPassword = BCryptPassword;
    }
}
