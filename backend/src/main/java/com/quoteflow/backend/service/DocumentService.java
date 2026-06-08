package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.Customer;
import com.quoteflow.backend.entity.Document;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.CustomerRepository;
import com.quoteflow.backend.repository.DocumentRepository;
import com.quoteflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public Document createDocument(UUID companyId, UUID customerId, UUID uploadedById,
                                    String fileName, String fileType, Long fileSize,
                                    String relatedEntityType, UUID relatedEntityId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        Customer customer = customerId != null ? customerRepository.findById(customerId).orElse(null) : null;
        User uploadedBy = userRepository.findById(uploadedById)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String fileUrl = generateMockFileUrl(companyId, fileName);

        Document document = Document.builder()
                .company(company)
                .customer(customer)
                .uploadedBy(uploadedBy)
                .fileName(fileName)
                .fileType(fileType)
                .fileSize(fileSize)
                .fileUrl(fileUrl)
                .relatedEntityType(relatedEntityType)
                .relatedEntityId(relatedEntityId)
                .build();
        return documentRepository.save(document);
    }

    public List<Document> getCompanyDocuments(UUID companyId) {
        return documentRepository.findByCompanyId(companyId);
    }

    public List<Document> getCustomerDocuments(UUID customerId) {
        return documentRepository.findByCustomerId(customerId);
    }

    public List<Document> getDocumentsByEntity(String entityType, UUID entityId) {
        return documentRepository.findByRelatedEntityTypeAndRelatedEntityId(entityType, entityId);
    }

    public Document getDocumentById(UUID id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
    }

    public String uploadDocument(UUID companyId, UUID uploadedById, String fileName, String fileType) {
        return generateMockFileUrl(companyId, fileName);
    }

    @Transactional
    public Document updateDocument(UUID id, String fileName) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        if (fileName != null) {
            document.setFileName(fileName);
        }
        return documentRepository.save(document);
    }

    public void deleteDocument(UUID id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        documentRepository.delete(document);
    }

    private String generateMockFileUrl(UUID companyId, String fileName) {
        return "https://storage.quoteflow.com/" + companyId + "/" + UUID.randomUUID() + "/" + fileName;
    }
}
