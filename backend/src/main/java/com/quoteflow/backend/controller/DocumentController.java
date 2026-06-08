package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.Document;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(documentService.getCompanyDocuments(user.getCompany().getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocument(@PathVariable UUID id) {
        return ResponseEntity.ok(documentService.getDocumentById(id));
    }

    @PostMapping
    public ResponseEntity<Document> createDocument(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Document created = documentService.createDocument(
                user.getCompany().getId(),
                body.get("customerId") != null ? UUID.fromString((String) body.get("customerId")) : null,
                user.getId(),
                (String) body.get("fileName"),
                (String) body.get("fileType"),
                body.get("fileSize") != null ? Long.parseLong(body.get("fileSize").toString()) : null,
                (String) body.get("relatedEntityType"),
                body.get("relatedEntityId") != null ? UUID.fromString((String) body.get("relatedEntityId")) : null
        );
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Document> updateDocument(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(documentService.updateDocument(id, (String) body.get("fileName")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable UUID id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Document>> getCustomerDocuments(@PathVariable UUID customerId) {
        return ResponseEntity.ok(documentService.getCustomerDocuments(customerId));
    }

    @GetMapping("/entity/{entityType}/{entityId}")
    public ResponseEntity<List<Document>> getEntityDocuments(@PathVariable String entityType, @PathVariable UUID entityId) {
        return ResponseEntity.ok(documentService.getDocumentsByEntity(entityType, entityId));
    }
}
