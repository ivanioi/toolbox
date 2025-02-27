package org.example.toolboxbackend.web.pojo.web.leetcode.rsp;

import lombok.Data;
import org.example.toolboxbackend.web.pojo.web.leetcode.LeetCodePOJO;

import java.util.List;

@Data
public class LeetCodeQueryRSP {
    private LeetCodePOJO question;
    private List<LeetCodePOJO> subQuestions;
}
