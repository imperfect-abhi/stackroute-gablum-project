package com.gablum.contract.contracts.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Document("contractBlockchain")
public class Block {
    private String encryptedData;
    private String previousHash;
    private String currentHash;
}
