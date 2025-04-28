package org.example.toolboxbackend.modules.entropy.enums;

public enum EntropyType {
    ENTROPY(0, "熵"),
    INVERSE_ENTROPY(1, "逆熵");

    private String name;
    private Integer code;

    EntropyType(Integer code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Integer getCode() {
        return code;
    }
}
