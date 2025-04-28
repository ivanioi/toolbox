package org.example.toolboxbackend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@MapperScan("org.example.toolboxbackend.**.mapper")
@EnableTransactionManagement
@SpringBootApplication(scanBasePackages = "org.example.toolboxbackend")
@ServletComponentScan(basePackages = "org.example.toolboxbackend.web")
public class ToolboxBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(ToolboxBackendApplication.class, args);
    }
}
