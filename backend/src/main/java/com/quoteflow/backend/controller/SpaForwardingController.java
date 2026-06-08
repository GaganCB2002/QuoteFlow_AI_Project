package com.quoteflow.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardingController {

    @GetMapping({ "/dashboard", "/estimation", "/quotations", "/products", "/invoices", "/receipts", "/customers",
            "/crm", "/marketing", "/finance", "/notifications", "/visitors", "/admin", "/settings", "/profile"
    })

    public String forwardSpaRoutes() {
        // Forward these routes to the static dashboard.html file
        return "forward:/app/dashboard.html";
    }
}
