package org.example.toolboxbackend.web.pojo.web.rsp.exchangerate;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class CurrenicesRsp {
    /**
     * 货币简称 : 货币全称
     */
    private Map<String, String> currenices;
    /**
     * 货币列表个数
     */
    private Integer total;
}
