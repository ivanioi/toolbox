package org.example.toolboxbackend.web.controllers;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.Nullable;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.example.toolboxbackend.web.pojo.web.Rsp;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.servlet.support.RequestContextUtils;

@RestController
@RequestMapping("/api")
public class HelloWorldController {

    @Operation(summary = "Test API", description = "Test Hello World API")
    @GetMapping("/hello")
    public Rsp<String> helloWorld(@Nullable @RequestParam String name, HttpServletRequest request) {
        return Rsp.<String>success("Hello " + name);
    }
}
