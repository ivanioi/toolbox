package org.example.toolboxbackend.modules.entropy.controller;

import jakarta.annotation.Nullable;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.example.toolboxbackend.modules.entropy.constants.EntropyConstants;
import org.example.toolboxbackend.modules.entropy.entity.Entropylog;
import org.example.toolboxbackend.modules.entropy.mapper.EntropylogMapper;
import org.example.toolboxbackend.modules.entropy.po.UpdateEntropyPO;
import org.example.toolboxbackend.modules.entropy.vo.EntropyInfoVO;
import org.example.toolboxbackend.web.enums.ErrorCode;
import org.example.toolboxbackend.web.exceptions.BusinessException;
import org.example.toolboxbackend.web.pojo.web.Rsp;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@Validated
@RequestMapping("/api/feature/entropy")
public class EntropyController {

    @Resource
    private EntropylogMapper entropylogMapper;


    /**
     * 获取各类熵数量，如果日期不为空，则只返回该日期段内的熵增长值, 逆熵增长值
     * 1. 熵初始值
     * 2. 逆熵初始值
     * 3. 熵增长值
     * 4. 逆熵增长值
     * @param startDate
     * @param endDate
     * @return
     */
    @GetMapping
    public Rsp<EntropyInfoVO> getEntropyInfo(@Validated @Nullable LocalDate startDate, @Validated @Nullable LocalDate endDate) {
        List<Integer> updateEntropyInfo = entropylogMapper.selectByDateRange(startDate, endDate);
        if (Objects.isNull(updateEntropyInfo) || updateEntropyInfo.size() == 0 ) {
            updateEntropyInfo = new ArrayList<>();
            updateEntropyInfo.add(0);
            updateEntropyInfo.add(0);
        }
        if (updateEntropyInfo.size() != 2) return Rsp.fail(ErrorCode.ERROR, "熵增长值SQL查询异常");
        return Rsp.success(EntropyInfoVO.builder()
                .defaultEntropy(EntropyConstants.DEFAULT_ENTROPY_COUNT)
                .defaultInverseEntropy(EntropyConstants.DEFAULT_INVERSE_ENTROPY_COUNT)
                .updateEntropy(updateEntropyInfo.get(0))
                .updateInverseEntropy(updateEntropyInfo.get(1)).build());
    }

    /**
     * 增加熵/逆熵接口
     * @param updateEntropyPO
     * @return
     */
    @PostMapping
    public Rsp updateEntropy(@Valid @RequestBody UpdateEntropyPO updateEntropyPO) {
        Entropylog entity = new Entropylog();
        entity.setType(updateEntropyPO.getType());
        entity.setUpdateCount(updateEntropyPO.getCount());
        int count = entropylogMapper.insertSelective(entity);
        if (count != 1) {
            throw new BusinessException(ErrorCode.ERROR, "熵增操作SQL执行异常");
        }
        return Rsp.success();
    }
}
