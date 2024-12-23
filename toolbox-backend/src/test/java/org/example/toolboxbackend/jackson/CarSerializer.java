package org.example.toolboxbackend.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class CarSerializer extends StdSerializer<Car> {

    public CarSerializer() {
        this(null);
    }

    public CarSerializer(Class<Car> t) {
        super(t);
    }

    @Override
    public void serialize(Car value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("car_brand", value.getType());
        gen.writeEndObject();
    }
}
