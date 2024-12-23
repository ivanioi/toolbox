package org.example.toolboxbackend.web.pojo;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class ExchangeRateHistoryPOJO {
    private String baseCurrency;
    private String compareCurrency;
    private List<ExchangeRateChangePair> history;

    @Builder
    @Data
    public static class ExchangeRateChangePair {
        private LocalDate date;
        private Double exchangeRate;
    }

}
