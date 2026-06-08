INSERT INTO companies (id, company_name, gst_number, phone, email, address, city, state, pincode)
VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Demo Company', '29ABCDE1234F1Z5', '9876543210', 'demo@quoteflow.ai', '123 Business Park', 'Mumbai', 'Maharashtra', '400001');

INSERT INTO users (id, company_id, name, phone, email, role)
VALUES ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Admin User', '9876543210', 'admin@quoteflow.ai', 'COMPANY_ADMIN');

INSERT INTO users (id, company_id, name, phone, email, role)
VALUES ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sales Executive', '9876543211', 'sales@quoteflow.ai', 'SALES_EXECUTIVE');

INSERT INTO customers (id, company_id, name, phone, email, gst, city, state)
VALUES
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Rahul Verma', '9988776655', 'rahul@example.com', '07XYZ1234A1B2C', 'Delhi', 'Delhi'),
  ('e5f6a7b8-c9d0-1234-efab-345678901234', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Priya Singh', '9876543210', 'priya@example.com', '27PQRST5678G1H6', 'Ahmedabad', 'Gujarat'),
  ('f6a7b8c9-d0e1-2345-fabc-456789012345', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Amit Patel', '9765432109', 'amit@example.com', '24LMNOP9012J3K7', 'Gandhinagar', 'Gujarat');
