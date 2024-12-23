package org.example.toolboxbackend.web.exceptions;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.example.toolboxbackend.web.enums.ErrorCode;
import org.example.toolboxbackend.web.pojo.web.Rsp;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class WebExceptionHandler {

    @ExceptionHandler(value = BusinessException.class)
    public Rsp rPanBusinessExceptionHandler(BusinessException e) {
        e.printStackTrace();
        return Rsp.fail(e);
    }


    // Validator & jakarta Validation Exception!

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public Rsp methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        e.printStackTrace();

        ObjectError objectError = e.getBindingResult().getAllErrors().stream().findFirst().get();
        return Rsp.fail(ErrorCode.ERROR_PARAM.getCode(), objectError.getDefaultMessage());
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    public Rsp constraintDeclarationExceptionHandler(ConstraintViolationException e) {
        e.printStackTrace();
        ConstraintViolation<?> constraintViolation = e.getConstraintViolations().stream().findFirst().get();
        return Rsp.fail(ErrorCode.ERROR_PARAM.getCode(), constraintViolation.getMessage());
    }

    @ExceptionHandler(value = MissingServletRequestParameterException.class)
    public Rsp missingServletRequestParameterExceptionHandler(MissingServletRequestParameterException e) {
        e.printStackTrace();
        return Rsp.fail(ErrorCode.ERROR_PARAM.getCode(), e.getMessage());
    }

    @ExceptionHandler(value = IllegalStateException.class)
    public Rsp illegalStateExceptionHandler(IllegalStateException e) {
        e.printStackTrace();
        return Rsp.fail(ErrorCode.ERROR_PARAM);
    }

    @ExceptionHandler(value = BindException.class)
    public Rsp bindExceptionHandler(BindException e) {
        e.printStackTrace();
        FieldError fieldError = e.getBindingResult().getFieldErrors().stream().findFirst().get();
        return Rsp.fail(ErrorCode.ERROR_PARAM.getCode(), fieldError.getDefaultMessage());
    }

    @ExceptionHandler(value = RuntimeException.class)
    public Rsp runtimeExceptionHandler(RuntimeException e) {
        e.printStackTrace();
        return Rsp.fail(ErrorCode.ERROR.getCode(), e.getMessage());
    }

}
