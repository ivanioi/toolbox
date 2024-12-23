package org.example.toolboxbackend.web.converters;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.example.toolboxbackend.tools.fun.ExchangeRate;
import org.example.toolboxbackend.web.pojo.ExchangeRatePOJO;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.Map;

public class ExchangeRateDeserializer extends StdDeserializer<ExchangeRatePOJO> {

    public ExchangeRateDeserializer() {
        super(ExchangeRatePOJO.class);
    }
    @Override
    public ExchangeRatePOJO deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
        ExchangeRatePOJO exchangeRatePOJO = new ExchangeRatePOJO();
        JsonNode jsonNode = p.getCodec().readTree(p);

        Iterator<String> fields = jsonNode.fieldNames();
        while (fields.hasNext()) {
            String field = fields.next();
            if (field.equals("date")) {

                exchangeRatePOJO.setDate(LocalDate.parse(jsonNode.get(field).asText(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            } else {
                exchangeRatePOJO.setName(field);
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Double> detail = objectMapper.convertValue(((ObjectNode) jsonNode.get(field)), Map.class);
                exchangeRatePOJO.setDetail(detail);
            }
        }
        return exchangeRatePOJO;
    }
}
