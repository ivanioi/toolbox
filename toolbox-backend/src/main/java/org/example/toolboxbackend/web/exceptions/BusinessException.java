package org.example.toolboxbackend.web.exceptions;

import lombok.Getter;
import org.example.toolboxbackend.web.enums.ErrorCode;

@Getter
public class BusinessException extends RuntimeException{

    private ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super();
        this.errorCode = errorCode;
    }

    public BusinessException(Exception e) {
        this(ErrorCode.ERROR, e.getMessage(), e);
    }

    public BusinessException(ErrorCode errorCode, String message) {
        this(errorCode, message, null);
    }

    public BusinessException(ErrorCode errorCode, Throwable cause) {
        this(errorCode, cause.getMessage(), cause);
    }

    public BusinessException(ErrorCode errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }
}
