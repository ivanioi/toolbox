package org.example.toolboxbackend.web.controllers.features;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Nullable;
import jakarta.annotation.Resource;
import jakarta.validation.constraints.Null;
import org.apache.commons.lang3.StringUtils;
import org.example.toolboxbackend.web.converters.LeetCodeConvert;
import org.example.toolboxbackend.web.mapper.LeetCodeMapper;
import org.example.toolboxbackend.web.pojo.web.leetcode.LeetCodePOJO;
import org.example.toolboxbackend.web.pojo.web.leetcode.req.LeetCodeAddREQ;
import org.example.toolboxbackend.web.pojo.web.leetcode.req.LeetCodeQueryREQ;
import org.example.toolboxbackend.web.pojo.web.leetcode.req.LeetCodeUpdateREQ;
import org.example.toolboxbackend.web.pojo.web.leetcode.rsp.LeetCodeFiltersRSP;
import org.example.toolboxbackend.web.pojo.web.leetcode.rsp.LeetCodeQueryRSP;
import org.example.toolboxbackend.web.pojo.web.Rsp;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/feature/leetcode")
@Tag(name = "LeetCode", description = "算法题管理接口")
@Validated
public class LeetCodePanelController {

    @Resource
    private LeetCodeMapper leetcodeMapper;

    @Resource
    private LeetCodeConvert leetcodeConvert;

    @PostMapping("add")
    public Rsp addQuestion(@RequestBody LeetCodeAddREQ req) {
        LeetCodePOJO leetCode = leetcodeConvert.leetCodeAddREQToPOJO(req);
        leetcodeMapper.insertSelective(leetCode);
        return Rsp.success();
    }

    @PostMapping("update")
    public Rsp updateQuestion(@RequestBody LeetCodeUpdateREQ req) {
        LeetCodePOJO leetCode = leetcodeConvert.leetCodeUpdateREQToPOJO(req);
        leetcodeMapper.updateByPrimaryKeySelective(leetCode);
        return Rsp.success();
    }

    @GetMapping("delete")
    public Rsp deleteQuestion(@RequestParam Long id) {
        leetcodeMapper.deleteByPrimaryKey(id);
        return Rsp.success();
    }

    @PostMapping("query")
    public Rsp queryQuestions(@RequestBody LeetCodeQueryREQ req) {
        List<LeetCodePOJO> results = leetcodeMapper.selectBySelective(req);
        return Rsp.success(toQueryRspList(results));
    }

    private List<LeetCodeQueryRSP> toQueryRspList(List<LeetCodePOJO> leetCodePOJOs) {
        List<LeetCodeQueryRSP> results = new ArrayList<>();
        // 细分题型核心题目列表
        List<LeetCodePOJO> iconicRecord = leetCodePOJOs.stream().filter(leetCodePOJO -> leetCodePOJO.getSubType() != null && leetCodePOJO.getIsIconic().equals(1))
                .toList();

        // 细分题型核心题型类似题目
        for (LeetCodePOJO codePOJO : iconicRecord) {
            LeetCodeQueryRSP leetCodeQueryRSP = new LeetCodeQueryRSP();
            List<LeetCodePOJO> iconicSubQuestions = leetCodePOJOs.stream().filter(leetCodePOJO -> leetCodePOJO.getIsIconic().equals(0) &&
                            codePOJO.getSubType().equals(leetCodePOJO.getSubType()))
                    .toList();
            leetCodeQueryRSP.setQuestion(codePOJO);
            leetCodeQueryRSP.setSubQuestions(iconicSubQuestions);
            results.add(leetCodeQueryRSP);
        }

        for (LeetCodePOJO codePOJO : leetCodePOJOs) {
            LeetCodeQueryRSP leetCodeQueryRSP = new LeetCodeQueryRSP();
            if (StringUtils.isBlank(codePOJO.getSubType())) {
                leetCodeQueryRSP.setQuestion(codePOJO);
                leetCodeQueryRSP.setSubQuestions(Collections.EMPTY_LIST);
                results.add(leetCodeQueryRSP);
            }
        }
        return results;
    }

    @GetMapping("filters")
    public Rsp selectFilterColumns(@Validated @Nullable @RequestParam String mainType) {
        final List<String> mainTypes = leetcodeMapper.selectAllMainType();
        final List<String> subTypes = leetcodeMapper.selectAllSubType(StringUtils.isBlank(mainType) ? null : mainType);
        List<String> tags = leetcodeMapper.selectAllQuestionTags().stream().map(tag -> {
            if (tag != null) return tag.split(",");
            return new String[0];
        })
                .flatMap(Arrays::stream).distinct().toList();
        final List<String> origins = leetcodeMapper.selectAllOrigins();

        return Rsp.success(new LeetCodeFiltersRSP(mainTypes, subTypes, tags, origins));
    }
}
