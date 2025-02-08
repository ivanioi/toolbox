package org.example.toolboxbackend.web.mapper;

import org.apache.ibatis.annotations.Select;
import org.example.toolboxbackend.web.pojo.leetcode.LeetCodePOJO;
import org.example.toolboxbackend.web.pojo.leetcode.req.LeetCodeQueryREQ;

import java.util.List;

/**
* @author ivan-zhang
* @description 针对表【leetcode(leetcode题目)】的数据库操作Mapper
* @createDate 2025-02-07 11:13:24
* @Entity org.example.toolboxbackend.web.pojo.leetcode.LeetCodePOJO
*/
public interface LeetCodeMapper {

    int deleteByPrimaryKey(Long id);

    int insert(LeetCodePOJO record);

    int insertSelective(LeetCodePOJO record);

    LeetCodePOJO selectByPrimaryKey(Long id);

    List<LeetCodePOJO> selectBySelective(LeetCodeQueryREQ record);

    int updateByPrimaryKeySelective(LeetCodePOJO record);

    int updateByPrimaryKey(LeetCodePOJO record);

    @Select(" select distinct main_type from leetcode where main_type is not null ")
    List<String> selectAllMainType();

    @Select(" select distinct sub_type from leetcode where sub_type is not null ")
    List<String> selectAllSubType();

    @Select(" select distinct question_tags from leetcode where question_tags is not null ")
    List<String> selectAllQuestionTags();

    @Select(" select distinct origin from leetcode where origin is not null ")
    List<String> selectAllOrigins();
}
