package com.gablum.usermanagement.user.model;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignupResult {
    private String message;
    private boolean isOk;

}
