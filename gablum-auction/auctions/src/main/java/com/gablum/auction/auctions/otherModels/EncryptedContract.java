package com.gablum.auction.auctions.otherModels;

import org.apache.tomcat.util.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Random;

public class EncryptedContract {
    public Contracts contract;
    private String key ;
    private String initVector ;
    private IvParameterSpec iv;
    private SecretKeySpec secretKeySpec;
//    private int nonce;
    public void generatingKey(){
        int leftLimit = 97, rightLimit = 122;
        int targetStringLength = 32;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);
        for(int i=0; i<targetStringLength; i++){
            int randomLimitedInt = leftLimit + (int)(random.nextFloat()*(rightLimit-leftLimit+1));
            buffer.append((char) randomLimitedInt);
        }
        this.key = buffer.toString();
    }
    public String encrypt() {
        String value = contract.toBeEncrypted();
        try {
            this.generatingKey();
            this.iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            this.secretKeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, this.secretKeySpec, this.iv);
            byte[] encrypted = cipher.doFinal(value.getBytes());
            return Base64.encodeBase64String(encrypted);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public String decrypt(String encrypted, String key) {
        this.initVector ="initVector123456";
        try {
            this.key = key;
            this.iv = new IvParameterSpec(this.initVector.getBytes("UTF-8"));
            this.secretKeySpec = new SecretKeySpec(this.key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, iv);
            byte[] original = cipher.doFinal(Base64.decodeBase64(encrypted));
            return new String(original);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public EncryptedContract(Contracts contract){
        this.contract = contract;
        this.initVector ="initVector123456";
    }

}
