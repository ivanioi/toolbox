package org.example.toolboxbackend.web.pojo;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CheatSheet {
    private Integer id;
    private String title;
    private String language;
    // 0 图片， 1 文本
    private String type;
    private String textContent;
    private String imagePath;
    private String tags;
}
