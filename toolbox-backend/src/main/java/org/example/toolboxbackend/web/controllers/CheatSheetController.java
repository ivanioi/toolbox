package org.example.toolboxbackend.web.controllers;

import jakarta.annotation.Nullable;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.example.toolboxbackend.web.exceptions.BusinessException;
import org.example.toolboxbackend.web.mapper.CheatSheetMapper;
import org.example.toolboxbackend.web.pojo.CheatSheet;
import org.example.toolboxbackend.web.pojo.web.Rsp;
import org.example.toolboxbackend.web.pojo.web.req.cheatsheet.AddCheatSheetReq;
import org.example.toolboxbackend.web.pojo.web.req.cheatsheet.QueryCheatSheetReq;
import org.example.toolboxbackend.web.pojo.web.rsp.cheatcheet.CheatSheetRspPOJO;
import org.example.toolboxbackend.web.pojo.web.rsp.cheatcheet.QueryCheatSheetRsp;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/feature/cheatsheet")
@Validated
public class CheatSheetController {
    @Resource
    private CheatSheetMapper cheatSheetMapper;

    @Value("${toolbox.upload.path}")
    private String uploadPath;

    @PostMapping("/insertOne")
    public Rsp insertOne(@Valid @RequestBody AddCheatSheetReq cheatSheetReq) {
        CheatSheet cheatSheet = CheatSheet.builder()
                .title(cheatSheetReq.getTitle())
                .type(cheatSheetReq.getType())
                .tags(cheatSheetReq.getTags())
                .language(cheatSheetReq.getLanguage()).build();

        try {
            if (cheatSheetReq.getType().equals("0")) {
                cheatSheet.setImagePath(cheatSheetReq.getFilePath());
            } else {
                cheatSheet.setTextContent(Files.readString(Path.of(uploadPath, cheatSheetReq.getFilePath())));
            }
            cheatSheetMapper.insertOne(cheatSheet);
        }catch (BusinessException be) {
            be.printStackTrace();
            return Rsp.fail(be);
        }catch (Exception e) {
            e.printStackTrace();
            return Rsp.fail(new BusinessException(e));
        }

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
        List<CheatSheetRspPOJO> cheatsheets = null;
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
