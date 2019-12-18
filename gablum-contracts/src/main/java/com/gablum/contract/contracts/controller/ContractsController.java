package com.gablum.contract.contracts.controller;

import com.gablum.contract.contracts.model.Contracts;
import com.gablum.contract.contracts.service.ContractService;
import com.gablum.contract.contracts.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ContractsController {
    @Autowired
    private ContractService contractService;

    @Autowired
    private UserService userService;

    // @GetMapping("/contracts/{contractsId}")
    // public Contracts getContract(@PathVariable String contractId){
    //     return contractService.getContractById(contractId);
    // }

    @GetMapping("/contracts/{email}")
    public List<Contracts> getAllContract(@PathVariable String email){
        List<Contracts> totalContracts = new ArrayList<Contracts>(contractService.getContractByBuyerEmail(email));
        totalContracts.addAll(contractService.getContractBySellerEmail(email));
        return totalContracts;
    }
    @GetMapping("/contracts/forBuyer")
    public List<Contracts> getContractByBuyerEmail(@RequestParam String email){
        return contractService.getContractByBuyerEmail(email);
    }

    @GetMapping("/contracts/forSeller")
    public List<Contracts> getContractBySellerEmail(@RequestParam String email){
        return contractService.getContractBySellerEmail(email);
    }

    @GetMapping("/contracts")
    public List<Contracts> getAllContracts(HttpServletRequest request){
        String email = userService.getEmail(request);
        List<Contracts> totalContracts = new ArrayList<Contracts>(contractService.getContractByBuyerEmail(email));
        totalContracts.addAll(contractService.getContractBySellerEmail(email));
        return totalContracts;
    }

//    @PostMapping("/contracts")
//    public Contracts saveContract(@RequestBody Contracts contracts){
//        return contractService.saveContract(contracts);
//    }

//    @PatchMapping("/contracts/{contractsId}")
//    public Contracts updateContractStatus(@PathVariable String contractId, @RequestBody Contracts contractToEdit){
//        return contractService.updateContract(contractId, contractToEdit);
//    }
}