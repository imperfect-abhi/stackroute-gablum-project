package com.gablum.usermanagement.user.model.othermodels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
public class ProductDetails {
    @Id
    private String productId = UUID.randomUUID().toString();
    private String productName;
    private List <String> productSpecList;
    private UUID userID;
    private String businessDomain;
    private String businessSubDomain;
}
