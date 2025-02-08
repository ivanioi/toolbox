package org.example.toolboxbackend.web.controllers.tools;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.example.toolboxbackend.web.pojo.ExchangeRateHistoryPOJO;
import org.example.toolboxbackend.web.pojo.ExchangeRatePOJO;
import org.example.toolboxbackend.web.pojo.web.Rsp;
import org.example.toolboxbackend.web.pojo.web.rsp.exchangerate.CurrenicesRsp;
import org.example.toolboxbackend.web.services.tools.ExchangeRateService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api")
@Tag(name = "ExchangeRate", description = "汇率转换接口")
public class ExchangeRateController {

    @Resource
    private ExchangeRateService exchangeRateService;

    @GetMapping("/currenices")
    public Rsp<CurrenicesRsp> currencies() {
        Map<String, String> currencies = exchangeRateService.getCurrencies();
        return Rsp.success(CurrenicesRsp.builder().currenices(currencies).total(currencies.size()).build());
    }

    @GetMapping("/exchangerate@{date:\\d\\d\\d\\d-\\d\\d-\\d\\d}/{currencyShortName}")
    public Rsp<ExchangeRatePOJO> getExchangeRate(@PathVariable LocalDate date, @PathVariable String currencyShortName) {
        return Rsp.success(exchangeRateService.getExchangeRate4All(date, currencyShortName));
    }

    @GetMapping("/exchangerate/history/{baseCurrency}/{compareCurrency}")
    public Rsp<ExchangeRateHistoryPOJO> getExchangeRateHistory(@PathVariable String baseCurrency, @PathVariable String compareCurrency) {
        return Rsp.success(exchangeRateService.getExchangeRateMonthHistoryInCurrentYear(baseCurrency, compareCurrency));
    }
}
