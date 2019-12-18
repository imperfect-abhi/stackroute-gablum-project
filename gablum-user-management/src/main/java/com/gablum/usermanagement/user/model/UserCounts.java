package com.gablum.usermanagement.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserCounts {
    long active;
    long locked;
    long disabled;
}
