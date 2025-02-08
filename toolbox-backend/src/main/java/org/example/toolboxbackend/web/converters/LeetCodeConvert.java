package org.example.toolboxbackend.web.converters;

import org.example.toolboxbackend.web.pojo.leetcode.LeetCodePOJO;
import org.example.toolboxbackend.web.pojo.leetcode.req.LeetCodeAddREQ;
import org.example.toolboxbackend.web.pojo.leetcode.req.LeetCodeQueryREQ;
import org.example.toolboxbackend.web.pojo.leetcode.req.LeetCodeUpdateREQ;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LeetCodeConvert {

    LeetCodePOJO leetCodeAddREQToPOJO(LeetCodeAddREQ leetCodeAddREQ);

    LeetCodePOJO leetCodeUpdateREQToPOJO(LeetCodeUpdateREQ leetCodeUpdateREQ);
}
