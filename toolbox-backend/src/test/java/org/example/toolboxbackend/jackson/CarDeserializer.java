package org.example.toolboxbackend.jackson;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;

public class CarDeserializer extends StdDeserializer<Car> {
    public CarDeserializer() {
        this(null);
    }

    public CarDeserializer(Class<?> vc) {
        super(vc);
    }
    @Override
    public Car deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
        Car car = new Car();
        ObjectCodec codec = p.getCodec();
        JsonNode treeNode = codec.readTree(p);
        car.setType(treeNode.get("type2").asText());
        car.setColor(treeNode.get("color2").asText());
        return car;
    }
}
