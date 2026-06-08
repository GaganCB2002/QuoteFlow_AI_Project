-- QuoteFlow AI: Credit Score Function
CREATE OR REPLACE FUNCTION calculate_credit_score(p_customer_id UUID)
RETURNS INTEGER AS $$
DECLARE
    on_time_rate DECIMAL;
    avg_delay_days DECIMAL;
    total_amount DECIMAL;
    months_active INTEGER;
    score INTEGER := 0;
BEGIN
    SELECT COALESCE(COUNT(*) FILTER (WHERE r.created_at <= i.due_date) * 100.0 / NULLIF(COUNT(*), 0), 0)
    INTO on_time_rate FROM invoices i JOIN receipts r ON r.invoice_id = i.id WHERE i.customer_id = p_customer_id;
    score := score + (on_time_rate / 100 * 40)::INTEGER;

    SELECT COALESCE(AVG(EXTRACT(DAY FROM (r.created_at - i.due_date))), 0)
    INTO avg_delay_days FROM invoices i JOIN receipts r ON r.invoice_id = i.id
    WHERE i.customer_id = p_customer_id AND r.created_at > i.due_date;
    score := score + GREATEST(0, 30 - avg_delay_days::INTEGER);

    SELECT COALESCE(SUM(total_amount), 0) INTO total_amount FROM invoices WHERE customer_id = p_customer_id;
    score := score + LEAST(20, (total_amount / 100000)::INTEGER);

    SELECT COALESCE(EXTRACT(MONTH FROM NOW() - MIN(created_at)), 0) INTO months_active FROM invoices WHERE customer_id = p_customer_id;
    score := score + LEAST(10, months_active);

    RETURN LEAST(100, GREATEST(0, score));
END;
$$ LANGUAGE plpgsql;
