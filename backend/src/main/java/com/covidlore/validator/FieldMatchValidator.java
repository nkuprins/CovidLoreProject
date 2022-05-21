package com.covidlore.validator;

import org.springframework.beans.BeanWrapperImpl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class FieldMatchValidator implements ConstraintValidator<FieldMatch, Object> {
	
	private String firstFieldName;
    private String secondFieldName;

    @Override
    public void initialize(FieldMatch annotation) {
        this.firstFieldName = annotation.first();
        this.secondFieldName = annotation.second();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {

        Object firstObj = new BeanWrapperImpl(value).getPropertyValue(firstFieldName);
        Object secondObj = new BeanWrapperImpl(value).getPropertyValue(secondFieldName);

        if (firstObj != null && secondObj != null)
            return firstObj.equals(secondObj);

        return false;
    }
	
}