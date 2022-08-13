package com.example.authservice.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Data
public class JwtRequestModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 2636936156391265891L;
    private String username;
    private String password;


}
