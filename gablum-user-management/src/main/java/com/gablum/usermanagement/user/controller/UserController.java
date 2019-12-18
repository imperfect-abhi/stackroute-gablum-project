package com.gablum.usermanagement.user.controller;

import com.gablum.usermanagement.user.model.NavLink;
import com.gablum.usermanagement.user.model.User;
import com.gablum.usermanagement.user.security.JwtTokenProvider;
import com.gablum.usermanagement.user.security.UserService;
//import com.gablum.usermanagement.user.services.MailService;
import com.gablum.usermanagement.user.services.UserManagementService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequestMapping
@RestController
public class UserController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserManagementService managementService;

    @Autowired
    private UserService userService;

//    @Autowired
//    private MailService mailService;

    private Claims tokenClaims;

    @GetMapping
    public void getUsers() {
        // TODO implement get all users for admin.
    }


    @GetMapping("/menuitems")
    public List<NavLink> getMenuItems(HttpServletRequest request) {
        boolean isBuyer = false;
        boolean isSeller = false;
        boolean isAdmin = false;
//        boolean isAdmin = false;
        String token = tokenProvider.resolveToken(request);
        tokenClaims = Jwts.parser().setSigningKey(tokenProvider.getSecretKey()).parseClaimsJws(token).getBody();
        List<String> roles = tokenClaims.get("auth", List.class);
        for(String role: roles) {
            if (role.contains("buyer")) {
                isBuyer = true;
            }
            if (role.contains("seller")) {
                isSeller = true;
            }
            if (role.contains("admin")) {
                isAdmin = true;
            }
        }
        List<NavLink> menuItems = new ArrayList<NavLink>();
        if (isSeller || isBuyer) {
            menuItems.addAll(List.of(
                    new NavLink("Dashboard", "/dashboard", "dashboard"),
//                    new NavLink("Calendar", "/calendar", "calendar_today"),
                    new NavLink("Contracts", "/contracts", "book")
//                    new NavLink("Inbox", "/inbox", "email"))
            ));
        }

        if(isBuyer) {
            menuItems.add(new NavLink("New Proposal", "/float-proposal", "add"));
        }

        if (isSeller) {
            menuItems.add(
                    new NavLink("Browse Proposals", "/browse", "list")
            );
            menuItems.add(
                    new NavLink("Inbox", "/inbox", "email")

            );
        }
        if (isAdmin) {
            menuItems.addAll(List.of(
                    new NavLink("Dashboard", "/dashboard", "dashboard"),
//                    new NavLink("Calendar", "/calendar", "calendar_today"),
                    new NavLink("Contracts", "/contracts_admin", "book"),
//                    new NavLink("Inbox", "/inbox", "email"))
                    new NavLink("Users", "/users_performance", "supervised_user_circle"),
                    new NavLink("Performance","/performance", "settings_applications")

            ));
        }
        return menuItems;
    }

    @GetMapping("/profile")
    public User getUserProfileByEmail(HttpServletRequest request) {
        String token = tokenProvider.resolveToken(request);
        tokenClaims = Jwts.parser().setSigningKey(tokenProvider.getSecretKey()).parseClaimsJws(token).getBody();
        String email = tokenClaims.get("sub", String.class);
        User foundUser = managementService.getUser(email);
        foundUser.setPassword(null);
        return foundUser;
    }

    @GetMapping("/profile/{email}")
    public User getUserProfilesByEmail(@PathVariable String email){
        return userService.getUserByEmail(email);
    }

    @PatchMapping("/profile")
    public ResponseEntity<User> editUserProfile(@RequestBody User modifiedUser, HttpServletRequest request) {
        String token = tokenProvider.resolveToken(request);
        tokenClaims = Jwts.parser().setSigningKey(tokenProvider.getSecretKey()).parseClaimsJws(token).getBody();
//        UUID userIdUUID = UUID.fromString(userId);
        String email = tokenClaims.get("sub", String.class);
        User user = managementService.getUser(email);
        if (user == null) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User> (
                userService.editUserDetail(modifiedUser, email), HttpStatus.OK
        );
    }
//    public List<User> userListBySubDomain(String subDomain){
//        return managementService.getAllUsersBySubDomain(subDomain);
//    }
}
