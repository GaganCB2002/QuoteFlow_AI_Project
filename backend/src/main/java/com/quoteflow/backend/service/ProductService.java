package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.Category;
import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.Product;
import com.quoteflow.backend.repository.CategoryRepository;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CompanyRepository companyRepository;

    public Category createCategory(String name, String description, String type, String hsnCode, String sacCode, UUID companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        Category category = Category.builder()
                .company(company)
                .name(name)
                .description(description)
                .type(type)
                .hsnCode(hsnCode)
                .sacCode(sacCode)
                .build();
        return categoryRepository.save(category);
    }

    public List<Category> getCompanyCategories(UUID companyId) {
        return categoryRepository.findByCompanyId(companyId);
    }

    public Category updateCategory(UUID id, String name, String description, String hsnCode, String sacCode) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        if (name != null) category.setName(name);
        if (description != null) category.setDescription(description);
        if (hsnCode != null) category.setHsnCode(hsnCode);
        if (sacCode != null) category.setSacCode(sacCode);
        return categoryRepository.save(category);
    }

    public void deleteCategory(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        categoryRepository.delete(category);
    }

    public Product createProduct(String name, String description, String type, String unit,
                                  java.math.BigDecimal costPrice, java.math.BigDecimal sellingPrice,
                                  java.math.BigDecimal gstRate, Integer stockQuantity, String sku,
                                  UUID companyId, UUID categoryId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        Category category = categoryId != null ? categoryRepository.findById(categoryId).orElse(null) : null;
        Product product = Product.builder()
                .company(company)
                .category(category)
                .name(name)
                .description(description)
                .type(type)
                .unit(unit)
                .costPrice(costPrice)
                .sellingPrice(sellingPrice)
                .gstRate(gstRate)
                .stockQuantity(stockQuantity)
                .sku(sku)
                .build();
        return productRepository.save(product);
    }

    public Product getProductById(UUID id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getCompanyProducts(UUID companyId) {
        return productRepository.findByCompanyId(companyId);
    }

    public List<Product> getProductsByType(UUID companyId, String type) {
        return productRepository.findByCompanyIdAndType(companyId, type);
    }

    public List<Product> getActiveProducts(UUID companyId) {
        return productRepository.findByCompanyIdAndIsActiveTrue(companyId);
    }

    public List<Product> searchProductsByName(UUID companyId, String name) {
        return productRepository.findByCompanyId(companyId).stream()
                .filter(p -> p.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
    }

    public Product updateProduct(UUID id, String name, String description, java.math.BigDecimal sellingPrice,
                                  java.math.BigDecimal costPrice, Integer stockQuantity, Boolean isActive) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (name != null) product.setName(name);
        if (description != null) product.setDescription(description);
        if (sellingPrice != null) product.setSellingPrice(sellingPrice);
        if (costPrice != null) product.setCostPrice(costPrice);
        if (stockQuantity != null) product.setStockQuantity(stockQuantity);
        if (isActive != null) product.setIsActive(isActive);
        return productRepository.save(product);
    }

    public void deleteProduct(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
    }
}
