package org.example.toolboxbackend.web.pojo.leetcode.rsp;

import lombok.Data;
import org.example.toolboxbackend.web.pojo.leetcode.LeetCodePOJO;

import java.util.List;

@Data
public class LeetCodeQueryRSP {
    private LeetCodePOJO question;
    private List<LeetCodePOJO> subQuestions;
}
