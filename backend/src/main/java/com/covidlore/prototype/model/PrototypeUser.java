package com.covidlore.prototype.model;

import com.covidlore.validator.FieldMatch;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/*
@class      - Represent a mask model for User during registration form
@validation - password and matching password should be equal
            - all fields are not null and at least of 1 length
*/

@FieldMatch.List({@FieldMatch(first = "password", second = "matchingPassword")})
@Getter
@Setter
@NoArgsConstructor
public class PrototypeUser {

    @NotNull
    @Size(min = 1)
    private String username;

    @NotNull
    @Size(min = 1)
    private String password;

    @NotNull
    @Size(min = 1)
    private String matchingPassword;
}
