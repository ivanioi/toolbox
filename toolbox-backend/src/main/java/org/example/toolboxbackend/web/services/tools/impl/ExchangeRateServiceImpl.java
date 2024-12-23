package org.example.toolboxbackend.web.services.tools.impl;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.example.toolboxbackend.tools.fun.ExchangeRate;
import org.example.toolboxbackend.web.pojo.ExchangeRateHistoryPOJO;
import org.example.toolboxbackend.web.pojo.ExchangeRatePOJO;
import org.example.toolboxbackend.web.services.tools.ExchangeRateService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ExchangeRateServiceImpl implements ExchangeRateService {

    @Resource
    private ExchangeRate exchangeRate;

    @Override
    public Map<String, String> getCurrencies() {
        return exchangeRate.getCurrencies();
    }

    @Override
    public ExchangeRatePOJO getExchangeRate4All(LocalDate date, String currency) {
        return exchangeRate.getExchangeRate4All(date, currency);
    }

    @Override
    public ExchangeRateHistoryPOJO getExchangeRateMonthHistoryInCurrentYear(String baseCurrency, String compareCurrency) {
        List<ExchangeRatePOJO> historyInCurrentYear = exchangeRate.getExchangeRateMonthHistoryInCurrentYear(baseCurrency);
        return ExchangeRateHistoryPOJO.builder()
                .baseCurrency(baseCurrency)
                .compareCurrency(compareCurrency)
                .history(historyInCurrentYear.stream().map(item -> ExchangeRateHistoryPOJO.ExchangeRateChangePair.builder()
                                .date(item.getDate())
                                .exchangeRate(item.getDetail().get(compareCurrency))
                                .build())
                        .toList()
                ).build();
    }
}
