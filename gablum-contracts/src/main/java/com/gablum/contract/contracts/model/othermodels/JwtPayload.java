package com.gablum.contract.contracts.model.othermodels;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class JwtPayload {
    private String sub;
    private List<String> auth;
    private long iat;
    private long exp;
}
