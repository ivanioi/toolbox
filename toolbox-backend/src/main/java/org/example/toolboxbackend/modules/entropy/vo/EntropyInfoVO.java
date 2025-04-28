package org.example.toolboxbackend.modules.entropy.vo;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntropyInfoVO {
    /**
     * 熵初始值
     */
    private Integer defaultEntropy;
    /**
     * 逆熵初始值
     */
    private Integer defaultInverseEntropy;
    /**
     * 熵增长值
     */
    private Integer updateEntropy;
    /**
     * 逆熵增长值
     */
    private Integer updateInverseEntropy;
}
