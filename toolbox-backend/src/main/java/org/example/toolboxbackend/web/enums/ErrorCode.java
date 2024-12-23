package org.example.toolboxbackend.web.enums;

import lombok.Getter;
import org.example.toolboxbackend.web.constants.SystemManageConstant;

@Getter
public enum ErrorCode {

    ERROR("1000", "服务器运行异常."), // 通用错误码
    ERROR_PARAM("1010", "参数异常"),
    ERROR_FILE_UPLOAD("1500", "文件上传异常."),
    ERROR_API("1600", "接口调用异常")
    ;


    private final String msg;
    private final String code;

    ErrorCode(String code, String msg) {
        this.code = code;
        this.msg = msg + " " +  SystemManageConstant.ADMIN_EMAIL;
    }
}
