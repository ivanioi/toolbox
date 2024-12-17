package org.example.toolboxbackend.web.controllers;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.Nullable;
import org.example.toolboxbackend.web.pojo.web.Rsp;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloWorldController {

    @Operation(summary = "Test API", description = "Test Hello World API")
    @GetMapping("/hello")
    public Rsp<String> helloWorld(@Nullable @RequestParam String name) {
        return Rsp.<String>success("Hello " + name);
    }
}
