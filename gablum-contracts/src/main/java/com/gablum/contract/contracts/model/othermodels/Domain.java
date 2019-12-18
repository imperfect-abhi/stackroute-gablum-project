package com.gablum.contract.contracts.model.othermodels;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class Domain {
    private List<Map<String, List<String>>> domainDetails;
    public Domain(){
        String agricultureDomainName = "Agriculture";
        List<String> subDomains = new ArrayList<>();
        subDomains.add("Raw Material");
        subDomains.add("Farm Produce");
        subDomains.add("Machinery");
        Map<String, List<String>> agricultureDomainMap = new HashMap<String, List<String>>();
        agricultureDomainMap.put(agricultureDomainName, subDomains);
        this.domainDetails.add(agricultureDomainMap);
    }
    public void addDomain(Map<String, List<String>> domain){
        domainDetails.add(domain);
    }
    public void addDomain(String domain, List<String> subDomains){
    }

    // TODO make it a singleton and only admin can add more domains.
}
