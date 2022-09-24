package com.covidlore.scoresservice.contraints;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class PossibleValuesValidator implements ConstraintValidator<PossibleValues, Integer> {

    int[] values;

    @Override
    public void initialize(PossibleValues constraintAnnotation) {
        values = constraintAnnotation.allowedValues();
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext constraintValidatorContext) {
        List<Integer> list = IntStream.of(values).boxed().toList();
        return list.contains(value);
    }
}
