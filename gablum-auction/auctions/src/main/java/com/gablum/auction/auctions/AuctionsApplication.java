package com.gablum.auction.auctions;

import com.gablum.auction.auctions.rabbit.InputRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.stream.annotation.EnableBinding;

@SpringBootApplication
@EnableBinding(InputRabbit.class)
public class AuctionsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuctionsApplication.class, args);
	}

}
