package org.example.toolboxbackend.web.pojo.web;

import lombok.Builder;
import lombok.Data;
import org.example.toolboxbackend.web.exceptions.BusinessException;

@Data
@Builder
public class Rsp<T> {
    /**
     * 1 success, 0 fail
     */
    private String success;
    /**
     * -1 无错误码, > 0 错误码
     */
    private String code;
    /**
     * 用于前端展示的信息
     */
    private String msg;
    /**
     * 用于描述失败细节信息，用于排查问题
     */
    private String desc;
    private T data;


    public static <T> Rsp<T> success(T data){
        return Rsp.<T>builder().success("1").code("-1").msg("success").desc("success").data(data).build();
    }

    public static <T> Rsp<T> fail(String code, String msg){
        return fail(code, msg, null);
    }

    public static <T> Rsp<T> fail(String code, String msg, String desc){
        return fail(code, msg, desc, null);
    }

    public static <T> Rsp<T> fail(String code, String msg, String desc, T data){
        return Rsp.<T>builder().success("0").code(code).msg(msg).desc(desc).data(data).build();
    }

    public static Rsp fail(BusinessException be){
        return fail(be.getErrorCode().getCode(), be.getErrorCode().getMsg(), be.getMessage(), null);
    }
}
