package com.gablum.usermanagement;

import com.gablum.usermanagement.user.rabbit.OutputRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.stream.annotation.EnableBinding;

@EnableEurekaClient
@SpringBootApplication
@EnableBinding(OutputRabbit.class)
public class UserApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserApiApplication.class, args);
	}
}
