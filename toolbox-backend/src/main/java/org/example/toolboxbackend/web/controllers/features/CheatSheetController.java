package org.example.toolboxbackend.web.controllers.features;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Nullable;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.example.toolboxbackend.web.exceptions.BusinessException;
import org.example.toolboxbackend.web.mapper.CheatSheetMapper;
import org.example.toolboxbackend.web.pojo.CheatSheetPOJO;
import org.example.toolboxbackend.web.pojo.web.Rsp;
import org.example.toolboxbackend.web.pojo.web.req.cheatsheet.AddCheatSheetReq;
import org.example.toolboxbackend.web.pojo.web.rsp.cheatcheet.CheatSheetRsp;
import org.example.toolboxbackend.web.pojo.web.rsp.cheatcheet.QueryCheatSheetRsp;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/feature/cheatsheet")
@Validated
@Tag(name = "CheatSheet", description = "备忘录管理接口")
public class CheatSheetController {
    @Resource
    private CheatSheetMapper cheatSheetMapper;

    @Value("${toolbox.upload.path}")
    private String uploadPath;

    @PostMapping("/insertOne")
    public Rsp insertOne(@Valid @RequestBody AddCheatSheetReq cheatSheetReq) {
        CheatSheetPOJO cheatSheet = CheatSheetPOJO.builder()
                .title(cheatSheetReq.getTitle())
                .type(cheatSheetReq.getType())
                .tags(cheatSheetReq.getTags())
                .imagePath(cheatSheetReq.getFilePath())
                .textContent(cheatSheetReq.getContent())
                .links(cheatSheetReq.getLinks())
                .language(cheatSheetReq.getLanguage()).build();

        cheatSheetMapper.insertOne(cheatSheet);

        return Rsp.success(null);
    }

    @GetMapping("/deleteOne/{id}")
    public Rsp deleteOne(@PathVariable @NotNull Integer id) {
        try {
            cheatSheetMapper.deleteOne(id);
        } catch (Exception e) {
            e.printStackTrace();
            return Rsp.fail(new BusinessException(e));
        }
        return Rsp.success(null);
    }

    @GetMapping("/query")
    public Rsp<QueryCheatSheetRsp> query(@RequestParam @Nullable String title, @RequestParam @Nullable String tag) {
        List<CheatSheetRsp> cheatsheets = null;
        List<String> tags = null;
        try {
            cheatsheets = cheatSheetMapper.query(title, tag);
            tags = cheatSheetMapper.queryTags().stream().flatMap((item) -> Arrays.stream(item.split(",")))
                    .distinct().toList();
        } catch (Exception e) {
            e.printStackTrace();
            return Rsp.fail(new BusinessException(e));
        }
        return Rsp.success(QueryCheatSheetRsp.builder().tags(tags).list(cheatsheets).build());
    }
}
