-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) NOT NULL,
    plan VARCHAR(255) NOT NULL DEFAULT 'FREE',
    status VARCHAR(255) NOT NULL DEFAULT 'ACTIVE',
    start_date DATE,
    end_date DATE,
    trial_end_date DATE,
    price DECIMAL(19, 2),
    auto_renew BOOLEAN DEFAULT true,
    max_users INTEGER DEFAULT 1,
    max_quotations INTEGER,
    features TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add trial, tracking, and hashing fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS registration_ip VARCHAR(45);
ALTER TABLE users ADD COLUMN IF NOT EXISTS registration_user_agent TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS trial_start_date TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(20) DEFAULT 'TRIAL';
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_hash VARCHAR(64);
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_hash VARCHAR(64);

-- Safely drop old unique constraint on phone
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_phone_key;

-- Add new unique constraints on hash fields
ALTER TABLE users ADD CONSTRAINT users_phone_hash_key UNIQUE (phone_hash);
ALTER TABLE users ADD CONSTRAINT users_email_hash_key UNIQUE (email_hash);
