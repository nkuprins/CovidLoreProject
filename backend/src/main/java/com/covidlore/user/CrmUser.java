package com.covidlore.user;

import com.covidlore.validator.FieldMatch;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

//@FieldMatch.List({
//        @FieldMatch(first = "password", second = "matchingPassword")
//})
@Getter
@Setter
@NoArgsConstructor
public class CrmUser {

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
