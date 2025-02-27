package org.example.toolboxbackend.web.pojo.web.leetcode.req;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LeetCodeAddREQ {


    /**
     * 题目名称
     */
    @NotBlank
    private String name;

    /**
     * 题目链接
     */
    @NotBlank
    private String link;

    /**
     * 题目所属大类，比如链表，逻辑题，递归题.....
     */
    @NotBlank
    private String mainType;

    /**
     * 大题型下的细化题型，比如排序题型下分为：特殊排序，TOP K......
     */
    @NotBlank
    private String subType;

    /**
     * 问题标签，用于各种标记目的：, 作为分隔符号
     */
    @Nullable
    private String questionTags;

    /**
     * 题目来源
     */
    @NotBlank
    private String origin;


    /**
     * 是否是细分题型的标志性题目: 0 否 1 是
     */
    @NotNull
    @Min(0)
    @Max(1)
    private Integer isIconic;

    /**
     * 0 Easy, 1 Medium, 2 Hard
     */
    @NotNull
    @Min(0)
    @Max(2)
    private Integer level;
}
