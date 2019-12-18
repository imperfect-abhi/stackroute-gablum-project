package com.gablum.usermanagement.user.model.othermodels;


public class Block {
    private String encryptedData;
    private String hash;

    public Block(String hash, String encryptedData){
        this.encryptedData = encryptedData;
        this.hash = hash;
    }

    public void setEncryptedData(String encryptedData) {
        this.encryptedData = encryptedData;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public String getEncryptedData() {
        return encryptedData;
    }

    public String getHash() {
        return hash;
    }

    @Override
    public String toString() {
        return "Block{" +
                "encryptedData='" + encryptedData + '\'' +
                ", hash='" + hash + '\'' +
                '}';
    }
}
