package com.covidlore.scoresservice.constraints;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;
import java.util.stream.IntStream;

public class PossibleNumbersValidator implements ConstraintValidator<PossibleNumbers, Integer> {

    int[] values;

    @Override
    public void initialize(PossibleNumbers constraintAnnotation) {
        values = constraintAnnotation.allowedValues();
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext constraintValidatorContext) {
        List<Integer> list = IntStream.of(values).boxed().toList();
        return list.contains(value);
    }
}
