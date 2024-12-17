package org.example.toolboxbackend.web.pojo.web.rsp.cheatcheet;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheatSheetRspPOJO {
    private String id;
    private String title;
    private String language;
    private String content; // 图片地址或文本内容
    private String tags;
    private String type;   // TODO: 类型字段往往前后端都依赖它，如果让二者状态同步呢?
}