package com.quoteflow.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaWebController {

    @GetMapping({"/app", "/app/{path:[^\\.]*}"})
    public String forwardSpaRoutes() {
        return "forward:/app/dashboard.html";
    }
}
