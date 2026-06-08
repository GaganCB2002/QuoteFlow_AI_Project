package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.*;
import com.quoteflow.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FinanceService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final CompanyRepository companyRepository;

    public Income createIncome(UUID companyId, UUID invoiceId, UUID customerId, String description,
                                BigDecimal amount, LocalDate incomeDate, String paymentMode, String reference) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        Income income = Income.builder()
                .company(company)
                .description(description)
                .amount(amount)
                .receivedAmount(amount)
                .outstandingAmount(BigDecimal.ZERO)
                .incomeDate(incomeDate)
                .paymentMode(paymentMode)
                .reference(reference)
                .build();
        return incomeRepository.save(income);
    }

    public Expense createExpense(UUID companyId, UUID createdById, String category, String description,
                                  BigDecimal amount, BigDecimal taxAmount, LocalDate expenseDate,
                                  String paymentMode, String reference) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        User createdBy = createdById != null ? new User() : null;
        if (createdById != null) {
            createdBy.setId(createdById);
        }
        BigDecimal totalAmount = amount.add(taxAmount != null ? taxAmount : BigDecimal.ZERO);
        Expense expense = Expense.builder()
                .company(company)
                .category(category)
                .description(description)
                .amount(amount)
                .taxAmount(taxAmount)
                .totalAmount(totalAmount)
                .expenseDate(expenseDate)
                .paymentMode(paymentMode)
                .reference(reference)
                .createdBy(createdBy)
                .build();
        return expenseRepository.save(expense);
    }

    public List<Income> getCompanyIncomes(UUID companyId) {
        return incomeRepository.findByCompanyId(companyId);
    }

    public List<Expense> getCompanyExpenses(UUID companyId) {
        return expenseRepository.findByCompanyId(companyId);
    }

    public Map<String, Object> getProfitLoss(UUID companyId, LocalDate startDate, LocalDate endDate) {
        List<Income> incomes = incomeRepository.findByCompanyIdAndIncomeDateBetween(companyId, startDate, endDate);
        List<Expense> expenses = expenseRepository.findByCompanyIdAndExpenseDateBetween(companyId, startDate, endDate);

        BigDecimal totalIncome = incomes.stream()
                .map(Income::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalExpense = expenses.stream()
                .map(Expense::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal netProfit = totalIncome.subtract(totalExpense);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("startDate", startDate);
        result.put("endDate", endDate);
        result.put("totalIncome", totalIncome);
        result.put("totalExpense", totalExpense);
        result.put("netProfit", netProfit);
        result.put("profitMargin", totalIncome.compareTo(BigDecimal.ZERO) > 0
                ? netProfit.multiply(new BigDecimal("100")).divide(totalIncome, 2, RoundingMode.HALF_UP) : BigDecimal.ZERO);
        return result;
    }

    public Map<String, Object> getGstReport(UUID companyId, LocalDate startDate, LocalDate endDate) {
        List<Income> incomes = incomeRepository.findByCompanyIdAndIncomeDateBetween(companyId, startDate, endDate);
        List<Expense> expenses = expenseRepository.findByCompanyIdAndExpenseDateBetween(companyId, startDate, endDate);

        BigDecimal gstCollected = BigDecimal.ZERO;
        BigDecimal gstPaid = expenses.stream()
                .filter(e -> e.getTaxAmount() != null)
                .map(Expense::getTaxAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("startDate", startDate);
        result.put("endDate", endDate);
        result.put("gstCollected", gstCollected);
        result.put("gstPaid", gstPaid);
        result.put("gstPayable", gstCollected.subtract(gstPaid));
        result.put("totalIncomes", incomes.size());
        result.put("totalExpenses", expenses.size());
        return result;
    }

    public Map<String, Object> getCashFlow(UUID companyId, LocalDate startDate, LocalDate endDate) {
        List<Income> incomes = incomeRepository.findByCompanyIdAndIncomeDateBetween(companyId, startDate, endDate);
        List<Expense> expenses = expenseRepository.findByCompanyIdAndExpenseDateBetween(companyId, startDate, endDate);

        Map<String, BigDecimal> monthlyIncome = new LinkedHashMap<>();
        Map<String, BigDecimal> monthlyExpense = new LinkedHashMap<>();

        for (Income income : incomes) {
            String key = income.getIncomeDate().getYear() + "-" + String.format("%02d", income.getIncomeDate().getMonthValue());
            monthlyIncome.merge(key, income.getAmount(), BigDecimal::add);
        }
        for (Expense expense : expenses) {
            String key = expense.getExpenseDate().getYear() + "-" + String.format("%02d", expense.getExpenseDate().getMonthValue());
            monthlyExpense.merge(key, expense.getTotalAmount(), BigDecimal::add);
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("startDate", startDate);
        result.put("endDate", endDate);
        result.put("monthlyIncome", monthlyIncome);
        result.put("monthlyExpense", monthlyExpense);
        result.put("totalIncome", incomes.stream().map(Income::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
        result.put("totalExpense", expenses.stream().map(Expense::getTotalAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
        return result;
    }

    @Transactional
    public void deleteIncome(UUID id) {
        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found"));
        incomeRepository.delete(income);
    }

    @Transactional
    public void deleteExpense(UUID id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        expenseRepository.delete(expense);
    }
}
