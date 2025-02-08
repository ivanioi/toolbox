package org.example.toolboxbackend.web.pojo.leetcode.req;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LeetCodeUpdateREQ {

    /**
     * id
     */
    @NotNull
    private Long id;
    /**
     * 题目名称
     */

    private String name;

    /**
     * 题目链接
     */

    private String link;

    /**
     * 题目所属大类，比如链表，逻辑题，递归题.....
     */
    private String mainType;

    /**
     * 大题型下的细化题型，比如排序题型下分为：特殊排序，TOP K......
     */

    private String subType;

    /**
     * 问题标签，用于各种标记目的：, 作为分隔符号
     */

    private String questionTags;


    private String origin;



    @Min(0)
    @Max(1)
    private Integer isIconic;

    /**
     * 0 Easy, 1 Medium, 2 Hard
     */

    @Min(0)
    @Max(2)
    private Integer level;

    /**
     * 0 Todo，1 Solved
     */
    private Integer status;

    /**
     * 熟悉度评分: 1, 2, 3, 4, 5
     */
    private Integer proficiencyRating;

}
