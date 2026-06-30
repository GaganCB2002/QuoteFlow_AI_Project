package com.quoteflow.backend.service;

import com.quoteflow.backend.dto.QuotationDto;
import com.quoteflow.backend.dto.QuotationItemDto;
import com.quoteflow.backend.entity.*;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.CustomerRepository;
import com.quoteflow.backend.repository.QuotationRepository;
import com.quoteflow.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuotationServiceTest {

    @Mock
    private QuotationRepository quotationRepository;
    @Mock
    private CustomerRepository customerRepository;
    @Mock
    private CompanyRepository companyRepository;
    @Mock
    private UserRepository userRepository;

    private QuotationService service;
    private UUID companyId;
    private UUID customerId;
    private UUID userId;
    private Company company;
    private Customer customer;
    private User user;
    private QuotationDto inputDto;

    @BeforeEach
    void setUp() {
        service = new QuotationService(quotationRepository, customerRepository, companyRepository, userRepository);

        companyId = UUID.randomUUID();
        customerId = UUID.randomUUID();
        userId = UUID.randomUUID();

        company = Company.builder()
                .id(companyId)
                .companyName("Test Corp")
                .quotePrefix("Q-")
                .phone("1234567890")
                .address("123 Street")
                .city("City")
                .state("State")
                .pincode("123456")
                .currency("INR")
                .build();

        customer = Customer.builder()
                .id(customerId)
                .company(company)
                .name("Test Customer")
                .phone("9876543210")
                .build();

        user = User.builder()
                .id(userId)
                .name("Sales User")
                .phone("1111111111")
                .role(Role.ROLE_SALES_EXECUTIVE)
                .build();

        QuotationItemDto itemDto = new QuotationItemDto();
        itemDto.setItemName("Web Development");
        itemDto.setQuantity(BigDecimal.ONE);
        itemDto.setUnitPrice(BigDecimal.valueOf(50000));
        itemDto.setTotal(BigDecimal.valueOf(50000));

        inputDto = new QuotationDto();
        inputDto.setCompanyId(companyId);
        inputDto.setCustomerId(customerId);
        inputDto.setSubtotal(BigDecimal.valueOf(50000));
        inputDto.setTotalAmount(BigDecimal.valueOf(59000));
        inputDto.setTaxAmount(BigDecimal.valueOf(9000));
        inputDto.setTaxType("GST");
        inputDto.setCurrency("INR");
        inputDto.setItems(List.of(itemDto));
        inputDto.setValidUntil(LocalDate.now().plusDays(30));
    }

    @Test
    void testCreateQuotation_WithCustomerId() {
        when(companyRepository.findById(companyId)).thenReturn(Optional.of(company));
        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));

        Quotation savedQuotation = Quotation.builder()
                .id(UUID.randomUUID())
                .quoteNo("Q-1234567890")
                .company(company)
                .customer(customer)
                .createdBy(user)
                .subtotal(inputDto.getSubtotal())
                .totalAmount(inputDto.getTotalAmount())
                .taxAmount(inputDto.getTaxAmount())
                .taxType("GST")
                .currency("INR")
                .status(QuotationStatus.DRAFT)
                .items(List.of())
                .build();

        when(quotationRepository.save(any(Quotation.class))).thenReturn(savedQuotation);

        QuotationDto result = service.createQuotation(inputDto, user);

        assertNotNull(result);
        assertEquals(savedQuotation.getQuoteNo(), result.getQuoteNo());
        assertEquals(companyId, result.getCompanyId());
        assertEquals(customerId, result.getCustomerId());
        verify(quotationRepository).save(any(Quotation.class));
    }

    @Test
    void testCreateQuotation_WithoutCustomerId_FallsBackToWalkIn() {
        inputDto.setCustomerId(null);

        when(companyRepository.findById(companyId)).thenReturn(Optional.of(company));
        when(customerRepository.findByCompanyId(companyId)).thenReturn(List.of());

        Customer walkIn = Customer.builder()
                .id(UUID.randomUUID())
                .company(company)
                .name("Walk-in Customer")
                .phone("")
                .build();

        when(customerRepository.save(any(Customer.class))).thenReturn(walkIn);

        Quotation savedQuotation = Quotation.builder()
                .id(UUID.randomUUID())
                .quoteNo("Q-1234567890")
                .company(company)
                .customer(walkIn)
                .createdBy(user)
                .subtotal(inputDto.getSubtotal())
                .totalAmount(inputDto.getTotalAmount())
                .currency("INR")
                .status(QuotationStatus.DRAFT)
                .items(List.of())
                .build();

        when(quotationRepository.save(any(Quotation.class))).thenReturn(savedQuotation);

        QuotationDto result = service.createQuotation(inputDto, user);

        assertNotNull(result);
        verify(customerRepository).save(any(Customer.class));
        verify(quotationRepository).save(any(Quotation.class));
    }

    @Test
    void testCreateQuotation_CompanyNotFound_ThrowsException() {
        when(companyRepository.findById(companyId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.createQuotation(inputDto, user));
    }

    @Test
    void testCreateQuotation_CustomerNotFound_ThrowsException() {
        when(companyRepository.findById(companyId)).thenReturn(Optional.of(company));
        when(customerRepository.findById(customerId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.createQuotation(inputDto, user));
    }

    @Test
    void testMapToDto_MapsAllFields() {
        QuotationItem item = QuotationItem.builder()
                .id(UUID.randomUUID())
                .itemName("UI Design")
                .quantity(BigDecimal.valueOf(2))
                .unitPrice(BigDecimal.valueOf(10000))
                .total(BigDecimal.valueOf(20000))
                .build();

        Quotation quotation = Quotation.builder()
                .id(UUID.randomUUID())
                .quoteNo("Q-TEST-001")
                .company(company)
                .customer(customer)
                .createdBy(user)
                .subtotal(BigDecimal.valueOf(50000))
                .discountType("PERCENTAGE")
                .discountValue(BigDecimal.TEN)
                .taxType("GST")
                .taxAmount(BigDecimal.valueOf(9000))
                .totalAmount(BigDecimal.valueOf(59000))
                .currency("INR")
                .status(QuotationStatus.SENT)
                .aiGenerated(true)
                .aiConfidence(BigDecimal.valueOf(85))
                .voiceGenerated(false)
                .notes("Test notes")
                .termsConditions("Standard terms")
                .validUntil(LocalDate.now().plusDays(30))
                .items(List.of(item))
                .build();

        QuotationDto dto = service.getCustomerQuotations(customerId).stream().findFirst().orElse(null);

        when(quotationRepository.findByCustomerId(customerId)).thenReturn(List.of(quotation));

        List<QuotationDto> dtos = service.getCustomerQuotations(customerId);
        assertEquals(1, dtos.size());

        QuotationDto result = dtos.get(0);
        assertEquals(quotation.getId(), result.getId());
        assertEquals(quotation.getQuoteNo(), result.getQuoteNo());
        assertEquals(companyId, result.getCompanyId());
        assertEquals(customerId, result.getCustomerId());
        assertEquals(quotation.getSubtotal(), result.getSubtotal());
        assertEquals(quotation.getDiscountType(), result.getDiscountType());
        assertEquals(quotation.getTaxType(), result.getTaxType());
        assertEquals(quotation.getTotalAmount(), result.getTotalAmount());
        assertEquals(quotation.getCurrency(), result.getCurrency());
        assertEquals(quotation.getStatus(), result.getStatus());
        assertEquals(quotation.getAiGenerated(), result.getAiGenerated());
        assertEquals(quotation.getNotes(), result.getNotes());
        assertFalse(result.getItems().isEmpty());
        assertEquals("UI Design", result.getItems().get(0).getItemName());
    }

    @Test
    void testCreateQuotation_DefaultCurrency() {
        inputDto.setCurrency(null);
        inputDto.setCustomerId(null);

        when(companyRepository.findById(companyId)).thenReturn(Optional.of(company));
        when(customerRepository.findByCompanyId(companyId)).thenReturn(List.of());

        Customer walkIn = Customer.builder().id(UUID.randomUUID()).company(company).name("Walk-in Customer").phone("").build();
        when(customerRepository.save(any(Customer.class))).thenReturn(walkIn);

        Quotation saved = Quotation.builder()
                .id(UUID.randomUUID()).quoteNo("Q-TEST")
                .company(company).customer(walkIn).createdBy(user)
                .subtotal(BigDecimal.ZERO).totalAmount(BigDecimal.ZERO).currency("INR")
                .status(QuotationStatus.DRAFT).items(List.of()).build();

        when(quotationRepository.save(any(Quotation.class))).thenReturn(saved);

        QuotationDto result = service.createQuotation(inputDto, user);
        assertNotNull(result);
    }

    @Test
    void testGetCompanyQuotations_ReturnsList() {
        Quotation q = Quotation.builder()
                .id(UUID.randomUUID()).quoteNo("Q-COMP")
                .company(company).customer(customer).createdBy(user)
                .subtotal(BigDecimal.TEN).totalAmount(BigDecimal.TEN).currency("INR")
                .status(QuotationStatus.DRAFT).items(List.of()).build();

        when(quotationRepository.findByCompanyId(companyId)).thenReturn(List.of(q));

        List<QuotationDto> dtos = service.getCompanyQuotations(companyId);
        assertEquals(1, dtos.size());
        assertEquals("Q-COMP", dtos.get(0).getQuoteNo());
    }

    @Test
    void testGetCompanyQuotations_Empty() {
        when(quotationRepository.findByCompanyId(companyId)).thenReturn(List.of());
        assertTrue(service.getCompanyQuotations(companyId).isEmpty());
    }

    @Test
    void testCreateQuotation_SetsDefaultAiFlags() {
        inputDto.setAiGenerated(null);
        inputDto.setCustomerId(null);

        when(companyRepository.findById(companyId)).thenReturn(Optional.of(company));
        when(customerRepository.findByCompanyId(companyId)).thenReturn(List.of());

        Customer walkIn = Customer.builder().id(UUID.randomUUID()).company(company).name("Walk-in Customer").phone("").build();
        when(customerRepository.save(any(Customer.class))).thenReturn(walkIn);

        Quotation saved = Quotation.builder()
                .id(UUID.randomUUID()).quoteNo("Q-AI")
                .company(company).customer(walkIn).createdBy(user)
                .subtotal(BigDecimal.ZERO).totalAmount(BigDecimal.ZERO).currency("INR")
                .status(QuotationStatus.DRAFT).items(List.of())
                .aiGenerated(true).aiConfidence(BigDecimal.valueOf(90.0))
                .build();

        when(quotationRepository.save(any(Quotation.class))).thenReturn(saved);

        QuotationDto result = service.createQuotation(inputDto, user);
        assertEquals("Q-AI", result.getQuoteNo());
    }
}
