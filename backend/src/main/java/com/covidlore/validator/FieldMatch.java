package com.covidlore.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Constraint(validatedBy = FieldMatchValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface FieldMatch {

    String message() default "Values don't match!";
	String first();
    String second();

    // Groups allow to restrict the set of constraints when we deal with various validations
    Class<?>[] groups() default{};

    // Allows assigning custom payloads(idea is similar to Exceptions)
    Class<? extends Payload>[] payload() default{};

    @Target({ ElementType.TYPE })
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface List {
    	FieldMatch[] value();
    }
}