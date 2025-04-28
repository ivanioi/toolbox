package org.example.toolboxbackend.modules.entropy.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.example.toolboxbackend.modules.entropy.entity.Entropylog;

import java.time.LocalDate;
import java.util.List;

/**
* @author ivanzhang
* @description 针对表【entropylog】的数据库操作Mapper
* @createDate 2025-04-28 10:53:08
* @Entity org.example.toolboxbackend.modules.entropy.entity.Entropylog
*/
@Mapper
public interface EntropylogMapper {

    int deleteByPrimaryKey(Long id);

    int insert(Entropylog record);

    int insertSelective(Entropylog record);

    Entropylog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Entropylog record);

    int updateByPrimaryKey(Entropylog record);

    /**
     * 获取熵增长值， 逆熵增长值
     * @param startDate
     * @param endDate
     * @return
     */
    List<Integer> selectByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
