package com.gablum.usermanagement.user.model;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class NavLink {
    private String name;
    private String href;
    private String icon;
}
