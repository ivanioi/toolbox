package org.example.toolboxbackend.web.pojo.web.req.cheatsheet;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QueryCheatSheetReq {
    private String title;
    private String tag;
}
