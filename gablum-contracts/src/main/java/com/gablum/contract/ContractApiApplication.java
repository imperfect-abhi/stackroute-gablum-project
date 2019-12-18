package com.gablum.contract;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ContractApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContractApiApplication.class, args);
	}

}
