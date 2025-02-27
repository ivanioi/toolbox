package org.example.toolboxbackend.web.pojo.web.leetcode.rsp;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LeetCodeFiltersRSP {
    List<String> mainTypes;

    List<String> subTypes;

    List<String> tags;

    List<String> origins;
}
