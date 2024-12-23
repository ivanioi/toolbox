package org.example.toolboxbackend.jackson;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;


public class CarTest {

    @Test
    public void testReadWriteAPI() throws JsonProcessingException {

        String testJson = "{\"color\":\"yellow\",\"type\":\"sport\"}";

        ObjectMapper objectMapper = new ObjectMapper();
        Car car = new Car("yellow", "sport");

        Assertions.assertEquals(objectMapper.writeValueAsString(car), testJson);
        Assertions.assertEquals(objectMapper.readValue(testJson, Car.class).toString(), car.toString());
    }

    @Test
    public void testDeserializeFeature() throws JsonProcessingException {
        String jsonString
                = "{ \"color\" : \"Black\", \"type\" : \"Fiat\", \"year\" : \"1970\" }";
        ObjectMapper objectMapper = new ObjectMapper();
        Assertions.assertThrowsExactly(UnrecognizedPropertyException.class, () -> {
            objectMapper.readValue(jsonString, Car.class);
        });

        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        Car car = objectMapper.readValue(jsonString, Car.class);

        JsonNode jsonNode = objectMapper.readTree(jsonString);
        Assertions.assertEquals(jsonNode.size(), 3);
        Assertions.assertThrows(Exception.class, () -> {
            jsonNode.get("colors").asText();
        });

        Assertions.assertEquals("Black", jsonNode.get("color").asText());
    }

    @Test
    public void testCustom() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        SimpleModule simpleModule = new SimpleModule("custom");
        simpleModule.addSerializer(Car.class, new CarSerializer());
        simpleModule.addDeserializer(Car.class, new CarDeserializer());

        objectMapper.registerModule(simpleModule);

        Car car = new Car("black", "bwm");
        Assertions.assertEquals("{\"car_brand\":\"bwm\"}", objectMapper.writeValueAsString(car));

        String testJson = "{\"color2\":\"yellow\",\"type2\":\"sport\"}";
        Car car1 = objectMapper.readValue(testJson, Car.class);
        Assertions.assertEquals("yellow", car1.getColor());
    }

    @Test
    public void testCollection() throws JsonProcessingException {
        String jsonString = "[{\"color\":\"yellow\",\"type\":\"sport\"},{\"color\":\"yellow\",\"type\":\"sport\"}, {\"color\":\"yellow\",\"type\":\"sport\"}]";
        ObjectMapper objectMapper = new ObjectMapper();
        Car[] cars = objectMapper.readValue(jsonString, Car[].class);
        Assertions.assertEquals(3, cars.length);

        List<Car> cars1 = objectMapper.readValue(jsonString, new TypeReference<List<Car>>() {});
        Assertions.assertEquals(3, cars1.size());
    }
}
