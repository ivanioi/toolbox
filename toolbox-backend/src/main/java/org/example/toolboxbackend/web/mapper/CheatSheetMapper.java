package org.example.toolboxbackend.web.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.toolboxbackend.web.pojo.CheatSheet;
import org.example.toolboxbackend.web.pojo.web.rsp.cheatcheet.CheatSheetRspPOJO;
import org.example.toolboxbackend.web.pojo.web.rsp.cheatcheet.QueryCheatSheetRsp;

import java.util.List;

@Mapper
public interface CheatSheetMapper {
    Integer insertOne(CheatSheet cheatSheet);

    @Delete(" delete from cheatsheet where id = #{id} ")
    Integer deleteOne(@Param("id") Integer id);

    List<CheatSheetRspPOJO> query(@Param("title") String title, @Param("tag") String tag);

    @Select(" select distinct tags from cheatsheet  ")
    List<String> queryTags();
}
