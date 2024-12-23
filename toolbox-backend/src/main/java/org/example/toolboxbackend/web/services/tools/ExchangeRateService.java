package org.example.toolboxbackend.web.services.tools;

import org.example.toolboxbackend.web.pojo.ExchangeRateHistoryPOJO;
import org.example.toolboxbackend.web.pojo.ExchangeRatePOJO;

import java.time.LocalDate;
import java.util.Map;

public interface ExchangeRateService {
    /**
     * 获取支持的货币列表
     * @return
     */
    Map<String, String> getCurrencies();

    ExchangeRatePOJO getExchangeRate4All(LocalDate date, String currency);

    ExchangeRateHistoryPOJO getExchangeRateMonthHistoryInCurrentYear(String baseCurrency, String compareCurrency);
}
