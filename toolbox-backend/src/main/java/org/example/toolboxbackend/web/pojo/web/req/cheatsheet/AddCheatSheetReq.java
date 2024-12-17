package org.example.toolboxbackend.web.pojo.web.req.cheatsheet;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddCheatSheetReq {
    @NotBlank
    private String title;
    private String language;
    private String tags;
    @NotBlank
    private String filePath;
    @NotNull
    @Min(0)
    @Max(1)
    private String type;
}
