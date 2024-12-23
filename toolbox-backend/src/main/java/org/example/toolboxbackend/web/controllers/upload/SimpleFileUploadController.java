package org.example.toolboxbackend.web.controllers.upload;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.example.toolboxbackend.web.enums.ErrorCode;
import org.example.toolboxbackend.web.exceptions.BusinessException;
import org.example.toolboxbackend.web.pojo.web.Rsp;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/upload")
public class SimpleFileUploadController {
    @Value("${toolbox.upload.path}")
    private String rootPath;


    @Operation(summary = "通用文件上传接口")
    @PostMapping(path = "/simple", consumes = "multipart/form-data", produces = "application/json;charset=utf-8")
    public Rsp<String> uploadFile(@Parameter(description = "上传文件所属功能模块名称") @RequestParam String feature,
                                  @Parameter(description = "上传的文件字段必须为 file") @RequestParam("file") MultipartFile file) {
        String filePath = "";
        try {
            File uploadFile = Path.of(rootPath, feature).toFile();
            if(!uploadFile.exists()) {
                uploadFile.mkdir();
            }

            if (file.isEmpty()) {
                throw new BusinessException(ErrorCode.ERROR_FILE_UPLOAD, "上传文件内容为空.");
            }

            String fileName = System.currentTimeMillis() + "@" + StringUtils.trimAllWhitespace(file.getOriginalFilename());
            FileOutputStream fileOutputStream = new FileOutputStream(Path.of(uploadFile.getAbsolutePath(), fileName).toAbsolutePath().toString());
            fileOutputStream.write(file.getBytes());
            // /upload/.../file 上传文件的可访问路径
            filePath = Path.of("/", feature, fileName).toString();
        } catch (IOException e) {
            return Rsp.fail(ErrorCode.ERROR_FILE_UPLOAD.getCode(), ErrorCode.ERROR_FILE_UPLOAD.getMsg(), e.getMessage());
        } catch (BusinessException e) {
            return Rsp.fail(e);
        }
        return Rsp.success(filePath);
    }
}
