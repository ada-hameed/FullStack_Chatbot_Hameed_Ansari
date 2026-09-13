CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    user_type VARCHAR(20) NOT NULL,
    service_interest VARCHAR(150),
    message TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE enquiries
ADD CONSTRAINT enquiries_user_type_check
CHECK (user_type IN ('Student', 'Customer', 'Other'));

ALTER TABLE enquiries
ADD CONSTRAINT enquiries_status_check
CHECK (status IN ('New', 'Contacted', 'In Progress', 'Closed'));