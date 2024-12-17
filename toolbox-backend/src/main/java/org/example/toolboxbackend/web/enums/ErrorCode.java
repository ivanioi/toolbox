package org.example.toolboxbackend.web.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.toolboxbackend.web.constants.SystemManageConstant;

@Getter
public enum ErrorCode {

    EC100("100", "服务器运行异常."), // 通用错误码
    EC150("150", "文件上传异常.")
    ;

    private final String msg;
    private final String code;

    ErrorCode(String code, String msg) {
        this.code = code;
        this.msg = msg + " " +  SystemManageConstant.ADMIN_EMAIL;
    }
}
