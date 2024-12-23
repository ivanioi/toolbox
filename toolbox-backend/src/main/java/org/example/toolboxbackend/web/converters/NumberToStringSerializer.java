package org.example.toolboxbackend.web.converters;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.util.Objects;

public class NumberToStringSerializer extends StdSerializer<Number> {
    public NumberToStringSerializer() {
        this(Number.class);
    }

    public NumberToStringSerializer(Class<Number> t) {
        super(t);
    }

    @Override
    public void serialize(Number value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        if (Objects.isNull(value)) {
            gen.writeString(StringUtils.EMPTY);
        } else {
            gen.writeString(value.toString());
        }
    }
}