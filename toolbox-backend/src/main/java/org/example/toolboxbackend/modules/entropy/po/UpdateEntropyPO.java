package org.example.toolboxbackend.modules.entropy.po;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 增加熵/逆熵操作PO
 */
@Data
public class UpdateEntropyPO {
    /**
     * 熵类型： 0 熵， 1 逆熵
     */
    @NotNull
    @Min(0)
    @Max(1)
    private Integer type;
    /**
     * 熵变数值
     */
    @NotNull
    @Min(1)
    private Integer count;
}
