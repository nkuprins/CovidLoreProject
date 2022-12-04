package com.covidlore.scoresservice.constraints;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Retention(RUNTIME)
@Target({ FIELD, PARAMETER })
@Constraint(validatedBy = PossibleNumbersValidator.class)
public @interface PossibleNumbers {

    String message() default "Not possible number";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
    int[] allowedValues();

}
