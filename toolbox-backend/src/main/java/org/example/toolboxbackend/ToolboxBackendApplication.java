package org.example.toolboxbackend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@MapperScan("org.example.toolboxbackend.web.mapper")
@EnableTransactionManagement
@SpringBootApplication
public class ToolboxBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ToolboxBackendApplication.class, args);
    }
}
