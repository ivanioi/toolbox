package org.example.toolboxbackend.modules.entropy.entity;

import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName entropylog
 */
@Data
public class Entropylog {
    /**
     * 
     */
    private Long id;

    /**
     * 0 熵 1 逆向熵
     */
    private Integer type;

    /**
     * 变动数值 > 0
     */
    private Integer updateCount;

    /**
     * 
     */
    private Date createDate;
}