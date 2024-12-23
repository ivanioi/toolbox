package org.example.toolboxbackend.web.pojo;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
public class ExchangeRatePOJO {
    /**
     * 货币简称
     */
    private String name;
    private LocalDate date;
    /**
     * 指定日期对其它所有货币的汇率: {baseCurrencyName: {otherCurrency: exchangeRate}}
     */
    private Map<String, Double> detail  = new HashMap<>();
}
