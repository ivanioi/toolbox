package org.example.toolboxbackend.web.pojo.web.leetcode.req;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LeetCodeQueryREQ {
    /**
     * 题目所属大类，比如链表，逻辑题，递归题.....
     */
    @Nullable
    private String mainType;

    /**
     * 大题型下的细化题型，比如排序题型下分为：特殊排序，TOP K......
     */
    @Nullable
    private String subType;

    /**
     * 问题标签，用于各种标记目的：, 作为分隔符号
     */
    @Nullable
    private String questionTags;

    /**
     * 是否是细分题型的标志性题目: 0 否 1 是
     */
    @Nullable
    private String proficiencyRating;

    /**
     * 0 Easy, 1 Medium, 2 Hard
     */
    @Nullable
    private String level;

    /**
     * 0 Todo，1 Solved
     */
    @Nullable
    private String status;

}
