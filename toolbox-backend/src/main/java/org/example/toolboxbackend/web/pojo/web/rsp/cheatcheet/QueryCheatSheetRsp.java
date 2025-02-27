package org.example.toolboxbackend.web.pojo.web.rsp.cheatcheet;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Builder
public class QueryCheatSheetRsp {
    private List<CheatSheetRsp> list;
    private List<String> tags;
}
