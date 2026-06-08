package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.Category;
import com.quoteflow.backend.entity.Product;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(productService.getCompanyProducts(user.getCompany().getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable UUID id) {
        Product product = productService.getCompanyProducts(UUID.randomUUID()).stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Product created = productService.createProduct(
                (String) body.get("name"),
                (String) body.get("description"),
                (String) body.get("type"),
                (String) body.get("unit"),
                body.get("costPrice") != null ? new BigDecimal(body.get("costPrice").toString()) : null,
                body.get("sellingPrice") != null ? new BigDecimal(body.get("sellingPrice").toString()) : null,
                body.get("gstRate") != null ? new BigDecimal(body.get("gstRate").toString()) : null,
                body.get("stockQuantity") != null ? (Integer) body.get("stockQuantity") : null,
                (String) body.get("sku"),
                user.getCompany().getId(),
                body.get("categoryId") != null ? UUID.fromString((String) body.get("categoryId")) : null
        );
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        Product updated = productService.updateProduct(
                id,
                (String) body.get("name"),
                (String) body.get("description"),
                body.get("sellingPrice") != null ? new BigDecimal(body.get("sellingPrice").toString()) : null,
                body.get("costPrice") != null ? new BigDecimal(body.get("costPrice").toString()) : null,
                body.get("stockQuantity") != null ? (Integer) body.get("stockQuantity") : null,
                body.get("isActive") != null ? (Boolean) body.get("isActive") : null
        );
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(productService.getCompanyCategories(user.getCompany().getId()));
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Category created = productService.createCategory(
                (String) body.get("name"),
                (String) body.get("description"),
                (String) body.get("type"),
                (String) body.get("hsnCode"),
                (String) body.get("sacCode"),
                user.getCompany().getId()
        );
        return ResponseEntity.ok(created);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Product>> getProductsByType(@AuthenticationPrincipal User user, @PathVariable String type) {
        return ResponseEntity.ok(productService.getProductsByType(user.getCompany().getId(), type));
    }
}
