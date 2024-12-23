package org.example.toolboxbackend.date;

import org.apache.commons.lang3.time.DateUtils;
import org.apache.ibatis.type.MonthTypeHandler;
import org.junit.jupiter.api.Test;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;

public class DateTest {

    @Test
    public void testZero() {
        Date now = Date.from(Instant.now());
        LocalDateTime lnow = LocalDateTime.now();

        System.out.println(lnow.getDayOfYear());
        System.out.println(lnow.getYear());
        System.out.println(lnow.getMonthValue());
        System.out.println(lnow.getDayOfMonth());
        System.out.println(lnow.getDayOfWeek());
        System.out.println(lnow.getDayOfWeek().getValue());
        System.out.println(lnow.getHour());
    }

    @Test
    public void testZome() {
        LocalDateTime now = LocalDateTime.now();
        System.out.println(Arrays.toString(TimeZone.getAvailableIDs()));
        System.out.println(TimeZone.getDefault().toZoneId());
        System.out.println(Arrays.toString(TimeZone.getAvailableIDs(8)));
        System.out.println(Arrays.toString(TimeZone.getAvailableIDs(-5)));

        System.out.println(ZoneId.of("UTC+8"));
        System.out.println(ZoneId.of("UTC-5"));

        System.out.println(ZoneId.systemDefault());
    }

    @Test
    public void testFormatter() {
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        ZonedDateTime now1 = ZonedDateTime.now();

        ZonedDateTime now2 = ZonedDateTime.now(ZoneId.ofOffset("UTC", ZoneOffset.of("-05:00")));

        System.out.println(df.format(now1));
        System.out.println(df.format(now2));
    }
}
