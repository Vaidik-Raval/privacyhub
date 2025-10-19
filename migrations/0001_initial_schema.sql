-- Migration: 0001_initial_schema
-- Created: 2025-01-19
-- Description: Initial database schema for PrivacyHub on Cloudflare D1

-- Analyses table
CREATE TABLE analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    domain TEXT NOT NULL,
    hostname TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    overall_score REAL NOT NULL,
    privacy_grade TEXT NOT NULL,
    risk_level TEXT NOT NULL,
    gdpr_compliance TEXT NOT NULL,
    ccpa_compliance TEXT NOT NULL,
    dpdp_act_compliance TEXT,
    analysis_data TEXT NOT NULL,
    homepage_screenshot TEXT,
    scraper_used TEXT,
    content_length INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_checked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(domain, content_hash)
);

-- Indexes
CREATE INDEX idx_analyses_domain ON analyses(domain);
CREATE INDEX idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX idx_analyses_last_checked ON analyses(last_checked_at DESC);
CREATE INDEX idx_analyses_content_hash ON analyses(content_hash);
CREATE INDEX idx_analyses_domain_checked ON analyses(domain, last_checked_at DESC);

-- Stats table
CREATE TABLE analysis_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_analyses INTEGER DEFAULT 0,
    unique_domains INTEGER DEFAULT 0,
    avg_score REAL DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO analysis_stats (total_analyses, unique_domains, avg_score) VALUES (0, 0, 0.0);

-- Grade distribution
CREATE TABLE grade_distribution (
    grade TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
);

INSERT INTO grade_distribution (grade, count) VALUES
    ('A+', 0), ('A', 0), ('A-', 0),
    ('B+', 0), ('B', 0), ('B-', 0),
    ('C+', 0), ('C', 0), ('C-', 0),
    ('D+', 0), ('D', 0), ('D-', 0),
    ('F', 0);

-- Risk distribution
CREATE TABLE risk_distribution (
    risk_level TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
);

INSERT INTO risk_distribution (risk_level, count) VALUES
    ('EXEMPLARY', 0),
    ('LOW', 0),
    ('MODERATE', 0),
    ('MODERATE-HIGH', 0),
    ('HIGH', 0);
