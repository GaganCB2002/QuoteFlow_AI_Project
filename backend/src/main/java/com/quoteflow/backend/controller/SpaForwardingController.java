package com.quoteflow.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardingController {

    @GetMapping({ "/dashboard", "/estimation", "/quotations", "/products", "/invoices", "/receipts", "/customers",
            "/crm", "/marketing", "/finance", "/documents", "/notifications", "/visitors", "/admin", "/settings", "/profile",
            "/login", "/register"
    })
    public String forwardSpaRoutes() {
        // Forward these routes to the static index.html file so React Router can handle them
        return "forward:/index.html";
    }
}
