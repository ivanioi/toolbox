package org.example.toolboxbackend.jackson;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
public class DateOrder {
    private Date date;

    private LocalDate mDate;
    private LocalDateTime mDateTime;
}
