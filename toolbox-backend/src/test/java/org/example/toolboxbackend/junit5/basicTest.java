package org.example.toolboxbackend.junit5;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Test class showing the displayName Animation")
public class basicTest {

    @Test
    @DisplayName("Method displayName Animation")
    public void testHello() {
        Assertions.assertEquals("hello world", "hello world");
    }
}
