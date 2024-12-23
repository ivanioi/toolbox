package org.example.toolboxbackend.tools.fun;

import lombok.extern.slf4j.Slf4j;
import org.example.toolboxbackend.web.enums.ErrorCode;
import org.example.toolboxbackend.web.exceptions.BusinessException;
import org.example.toolboxbackend.web.pojo.ExchangeRatePOJO;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class ExchangeRate {

    private final RestClient restClient;

    public ExchangeRate(RestClient.Builder  restClientBuilder) {
        restClient = restClientBuilder.build();
    }


    /**
     * 获取支持的货币简称和名称
     * @return
     */
    public Map<String, String> getCurrencies() {
        Map result = new HashMap<>();
        try {
            result = restClient.get()
                    .uri("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json")
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(Map.class);
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.ERROR_API, e);
        }
        return  result;
    }

    /**
     * 获取指定日期对其它所有货币的的汇率
     * @param date
     * @param currency
     * @return
     */
    public ExchangeRatePOJO getExchangeRate4All(LocalDate date, String currency) {
        ExchangeRatePOJO result = new ExchangeRatePOJO();
        try {
             result = restClient.get()
                    .uri(String.format("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@%s/v1/currencies/%s.json", date, currency))
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(ExchangeRatePOJO.class);
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.ERROR_API, e);
        }

        return result;
    }

    /**
     * 获取最近 1 年每月 1 号的汇率值
     * @param currency
     * @return
     */
    public List<ExchangeRatePOJO> getExchangeRateMonthHistoryInCurrentYear(String currency) {
        List<ExchangeRatePOJO> result = new ArrayList<>();
        /**
         * 由于 API 目前只能最早只能获取到 2024-04-01 的数据
         */
        for (int i = 0; i < 4; i++) {
            result.add(getExchangeRate4All(LocalDate.now().minusMonths(i).withDayOfMonth(1), currency));
        }
        return result;
    }
}
