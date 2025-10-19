# 🔒 PrivacyHub.in - Privacy Policy Analyser

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**India's first AI-powered privacy policy analyzer helping users understand how websites handle their personal data with comprehensive DPDP Act 2023 compliance analysis.**

[🌐 Live Demo](https://privacyhub.in) · [📖 Methodology](https://privacyhub.in/methodology) · [🐛 Report Bug](https://github.com/privacypriority/privacyhub/issues) · [✨ Request Feature](https://github.com/privacypriority/privacyhub/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Analysis Methodology](#-analysis-methodology)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Architecture](#-architecture)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🎯 About

PrivacyHub is a production-ready, AI-powered privacy policy analyzer that empowers users to make informed decisions about their personal data. Using advanced AI models and comprehensive regulatory frameworks, we provide detailed privacy assessments with actionable recommendations.

### Why PrivacyHub?

- 🇮🇳 **India-Focused**: First privacy analyzer built specifically for India's DPDP Act 2023
- 🔍 **Evidence-Based Analysis**: Scientific methodology based on DPDP Act 2023 and international best practices
- 🤖 **AI-Powered**: DeepSeek Chat model via OpenRouter for sophisticated policy analysis
- 📊 **Comprehensive Scoring**: 6-category weighted assessment with 90+ privacy criteria
- 🎯 **DPDP Act Compliance**: In-depth analysis of Digital Personal Data Protection Act 2023 requirements
- 🎨 **Modern UX**: Intuitive dashboard with visual analytics and category breakdowns
- 🚀 **Production-Ready**: Enterprise-grade error handling, fallback systems, and security measures

---

## ✨ Features

### Core Analysis Features

- **🔐 Advanced Privacy Analysis**
  - AI-powered comprehensive privacy policy evaluation
  - India DPDP Act 2023 compliance assessment
  - 6 weighted categories: Data Minimization & Collection (30%), Third-Party Data Sharing (25%), Individual Rights & Controls (20%), Security & Risk Management (15%), Regulatory Compliance (7%), Transparency & Communication (3%)
  - 5-tier risk classification (HIGH RISK, MODERATE-HIGH RISK, MODERATE RISK, LOW RISK, EXEMPLARY)
  - Letter grades (A+ to F) for quick assessment
  - Evidence-based findings with specific DPDP Act regulatory references

- **📊 Interactive Results Dashboard**
  - Overall privacy score (1-10 scale) with circular progress visualization
  - Real-time category breakdown with color-coded mini charts
  - Privacy grade and risk level badges
  - Executive summary for stakeholders
  - Critical findings highlighting high-risk practices
  - Positive practices recognition
  - Actionable recommendations (immediate, medium-term, best practices)
  - Detailed regulatory compliance notes

- **🎨 Enhanced User Experience**
  - Web3-style gradient buttons (blue-purple-pink for Analyze, emerald-teal-cyan for Reset)
  - One-click Reset button to start new analysis
  - Home button for easy navigation back from results
  - Mobile-responsive design with optimized layouts
  - Collapsible methodology section for transparency
  - PWA-ready with custom icons and theme colors

### Technical Features

- **⚡ 3-Tier Scraping System**
  - Primary: Firecrawl API (markdown extraction)
  - Fallback 1: Crawlee PlaywrightCrawler (JavaScript rendering)
  - Fallback 2: Simple fetch (basic HTML parsing)
  - Automatic retry with graceful degradation

- **🔒 Production-Grade Reliability**
  - 60-second API timeout for complex analyses
  - Comprehensive error handling with specific timeout/network messages
  - Global error boundaries (error.tsx, not-found.tsx, loading.tsx)
  - Input validation and URL sanitization
  - Security headers middleware (HSTS, CSP, X-Frame-Options)

- **📱 SEO & Discoverability**
  - Dynamic sitemap.xml generation
  - Robots.txt for search engine indexing
  - Open Graph and Twitter Card metadata
  - Optimized meta descriptions and keywords

### Additional Features

- Comprehensive methodology page with detailed framework explanation
- Privacy education resources
- Category-specific icons and visual indicators
- Color-coded score bars for quick assessment
- Regulatory framework references (90+ compliance criteria)
- Real-time analysis progress indicators

---

## 📐 Analysis Methodology

PrivacyHub uses a scientifically-grounded, evidence-based framework for privacy assessment focused on India's DPDP Act 2023:

### Assessment Categories (Weighted)

1. **Data Minimization & Collection (30%)**
   - Collection scope, legal basis, purpose specification
   - Sensitive personal data protections (DPDP Act Sec. 9)
   - Children's data compliance (DPDP Act Sec. 9)
   - Data fiduciary obligations and transparency

2. **Third-Party Data Sharing (25%)**
   - Sharing scope and commercial exploitation
   - International transfers and cross-border data flow (DPDP Act Sec. 16)
   - Data processor agreements (DPDP Act Sec. 8)
   - Consent Manager integration readiness

3. **Individual Rights & Controls (20%)**
   - Data Principal rights: access, correction, erasure (DPDP Act Sec. 11-12)
   - Data portability and objection mechanisms
   - Grievance redressal mechanisms (DPDP Act Sec. 32)
   - Withdrawal of consent (DPDP Act Sec. 7)

4. **Security & Risk Management (15%)**
   - Encryption standards (end-to-end, in-transit, at-rest)
   - Incident response and breach notification
   - Data localization compliance for India
   - Reasonable security safeguards (DPDP Act Sec. 8)

5. **Regulatory Compliance (7%)**
   - DPDP Act 2023 compliance indicators
   - Data Protection Board registration requirements
   - Data fiduciary and Significant Data Fiduciary obligations
   - Consent Manager framework compliance

6. **Transparency & Communication (3%)**
   - Plain language usage and readability
   - Grievance officer details (DPDP Act requirement)
   - Vernacular language support for Indian languages
   - Proactive change notifications

### Risk Classification

- **EXEMPLARY (10)**: Privacy-by-design implementation, exceeds DPDP Act minimums
- **LOW RISK (8-9)**: Strong privacy framework with minor gaps
- **MODERATE RISK (6-7)**: Some privacy protections present, improvement areas identified
- **MODERATE-HIGH RISK (4-5)**: Multiple compliance gaps, Data Principal rights compromised
- **HIGH RISK (1-3)**: Significant DPDP Act violations likely, Data Protection Board action probable

[View Full Methodology](https://privacyhub.in/methodology)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.2 (App Router with Turbopack)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Fonts**: Inter (sans-serif), JetBrains Mono (monospace)

### Backend & AI
- **API Routes**: Next.js API Routes (serverless functions)
- **AI Model**: DeepSeek Chat via OpenRouter
- **Web Scraping**:
  - Firecrawl API (primary)
  - Crawlee PlaywrightCrawler (fallback)
  - Native fetch API (final fallback)
- **Database**: SQLite (better-sqlite3) for local analysis storage

### Infrastructure
- **Hosting**: Vercel (recommended) or self-hosted
- **CDN**: Vercel Edge Network
- **Analytics**: Vercel Analytics (optional)
- **Deployment**: CI/CD via Vercel Git integration

### Security & Performance
- Input validation and URL sanitization
- SSRF protection (blocks private IPs, localhost)
- Security headers middleware
- Error boundaries and fallback UI
- PWA-ready with service worker support
- Optimized images (AVIF/WebP)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenRouter API key (required)
- Firecrawl API key (optional, recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/privacypriority/privacyhub.git
   cd privacyhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```env
   # Required - OpenRouter API for AI analysis
   OPENROUTER_API=your_openrouter_api_key_here

   # Optional - Firecrawl API for better web scraping
   FIRECRAWL_API_KEY=your_firecrawl_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables

See `.env.example` for a comprehensive list of available environment variables with detailed explanations.

**Required:**
- `OPENROUTER_API`: OpenRouter API key for AI analysis

**Optional:**
- `FIRECRAWL_API_KEY`: Firecrawl API key for enhanced scraping

---

## 🏗️ Architecture

### Project Structure

```
privacyhub/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts         # Privacy analysis API endpoint
│   │   ├── methodology/
│   │   │   └── page.tsx             # Methodology explanation page
│   │   ├── error.tsx                # Global error boundary
│   │   ├── not-found.tsx            # Custom 404 page
│   │   ├── loading.tsx              # Loading state
│   │   ├── layout.tsx               # Root layout with metadata
│   │   ├── sitemap.ts               # Dynamic sitemap generation
│   │   └── page.tsx                 # Homepage
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── circular-progress.tsx
│   │   │   ├── heatmap.tsx
│   │   │   ├── score-card.tsx
│   │   │   └── ...
│   │   ├── Header.tsx               # Navigation header
│   │   ├── Footer.tsx               # Footer with links
│   │   ├── PrivacyAnalyzer.tsx      # Main analyzer component
│   │   └── MethodologySection.tsx   # Methodology display
│   ├── lib/
│   │   └── input-validation.ts      # URL validation and sanitization
│   └── middleware.ts                # Security headers
├── public/
│   ├── favicon.ico                  # Favicon (all sizes)
│   ├── robots.txt                   # Search engine directives
│   └── site.webmanifest             # PWA manifest
├── .env.example                     # Environment variable template
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── vercel.json                      # Vercel deployment config
└── package.json                     # Dependencies and scripts
```

### Data Flow

1. **User Input** → URL validation → SSRF protection
2. **Scraping**:
   - Try Firecrawl API (markdown extraction)
   - Fallback to Crawlee (JavaScript rendering)
   - Final fallback to fetch (basic HTML)
3. **AI Analysis**:
   - Send content to DeepSeek Chat via OpenRouter
   - Structured JSON response with scores and findings
4. **Results Display**:
   - Parse and validate AI response
   - Render interactive dashboard
   - Show category breakdowns, compliance status, recommendations

### API Endpoint

**POST `/api/analyze`**
- **Input**: `{ "url": "https://example.com/privacy" }`
- **Output**: Comprehensive privacy analysis JSON
- **Timeout**: 60 seconds (Vercel Pro)
- **Error Handling**: Specific error messages for timeouts, network issues, invalid URLs

---

## 📚 API Documentation

### Analyze Privacy Policy

**Endpoint**: `POST /api/analyze`

**Request Body**:
```json
{
  "url": "https://example.com/privacy"
}
```

**Response**:
```json
{
  "url": "https://example.com/privacy",
  "timestamp": "2025-10-16T10:00:00.000Z",
  "content_length": 15420,
  "scraper_used": "firecrawl",
  "analysis": {
    "overall_score": 8.0,
    "risk_level": "LOW",
    "privacy_grade": "A-",
    "regulatory_compliance": {
      "dpdp_act_compliance": "COMPLIANT",
      "major_violations": []
    },
    "categories": {
      "data_collection": {
        "score": 8.5,
        "reasoning": "...",
        "dpdp_notes": "..."
      },
      // ... 5 more categories
    },
    "critical_findings": {
      "high_risk_practices": [],
      "regulatory_gaps": [],
      "data_subject_impacts": []
    },
    "positive_practices": ["..."],
    "actionable_recommendations": {
      "immediate_actions": [],
      "medium_term_improvements": ["..."],
      "best_practice_adoption": ["..."]
    },
    "executive_summary": "..."
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid URL, insufficient content
- `408 Request Timeout`: Request cancelled
- `429 Too Many Requests`: Rate limit exceeded (if enabled)
- `504 Gateway Timeout`: Website slow/unresponsive

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs**: [Open an issue](https://github.com/privacypriority/privacyhub/issues/new)
- ✨ **Request Features**: [Submit a feature request](https://github.com/privacypriority/privacyhub/issues/new)
- 📝 **Improve Documentation**: Fix typos, add examples, clarify instructions
- 💻 **Submit Code**: Fix bugs, add features, improve performance
- 🎨 **Design**: Improve UI/UX, create graphics, enhance accessibility
- 🌍 **Translate**: Help make PrivacyHub multilingual

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with clear, documented code
4. Commit: `git commit -m "feat: add amazing feature"`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Test additions or changes

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Import Repository**
   - Connect to GitHub in Vercel Dashboard
   - Import the privacyhub repository

2. **Configure Environment Variables**
   - Add `OPENROUTER_API` (required)
   - Add `FIRECRAWL_API_KEY` (optional)
   - Mark as "Sensitive" in Vercel settings

3. **Deploy**
   ```bash
   vercel --prod
   ```

**Vercel Configuration** (`vercel.json`):
- API route timeout: 60 seconds
- CORS headers configured
- Automatic HTTPS

### Self-Hosting

Requirements:
- Node.js 18+ server
- Process manager (PM2 recommended)
- Reverse proxy (nginx/Apache)
- SSL certificate

```bash
# Install PM2
npm install -g pm2

# Build application
npm run build

# Start with PM2
pm2 start npm --name "privacyhub" -- start

# Configure nginx reverse proxy
# Point to localhost:3000
```

---

## 🗺️ Roadmap

### Version 1.1 (Current - Q4 2024)
- [x] Category breakdown visualization
- [x] Web3-style gradient UI enhancements
- [x] Navigation improvements (Home, Reset buttons)
- [x] DPDP Act 2023 integration
- [x] Enhanced error handling
- [x] SQLite local database integration

### Version 1.2 (Q1 2025)
- [ ] Multi-language support (Hindi, Spanish, French)
- [ ] Privacy policy comparison tool
- [ ] Export analysis as PDF
- [ ] Browser extension
- [ ] Historical policy tracking

### Version 2.0 (Q2 2025)
- [ ] Mobile app (React Native)
- [ ] Advanced filtering and search
- [ ] API for third-party integration
- [ ] Custom compliance frameworks
- [ ] Enterprise features (teams, SSO)

See [Issues](https://github.com/privacypriority/privacyhub/issues) for detailed feature requests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Built With

- [Next.js](https://nextjs.org/) - React framework
- [OpenRouter](https://openrouter.ai/) - AI API gateway
- [DeepSeek](https://www.deepseek.com/) - AI model
- [Firecrawl](https://firecrawl.dev/) - Web scraping
- [Crawlee](https://crawlee.dev/) - Web crawling framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Hosting platform

### Regulatory Framework

- [DPDP Act 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) - Digital Personal Data Protection Act (India)
- [IT Act 2000](https://www.meity.gov.in/content/information-technology-act) - Information Technology Act (India)
- [IT Rules 2011](https://www.meity.gov.in/content/information-technology-rules-2011) - Reasonable Security Practices and Procedures

### Inspired By

- [ToS;DR](https://tosdr.org/) - Terms of Service; Didn't Read
- [Privacy Guides](https://www.privacyguides.org/) - Privacy tools and services
- Privacy research and academic publications

---

## 📬 Contact & Support

- **Website**: [privacyhub.in](https://privacyhub.in)
- **GitHub**: [Issues](https://github.com/privacypriority/privacyhub/issues) | [Discussions](https://github.com/privacypriority/privacyhub/discussions)
- **Methodology**: [View Analysis Framework](https://privacyhub.in/methodology)

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! It helps the project grow and reach more users who care about privacy.

[![Star History Chart](https://api.star-history.com/svg?repos=privacypriority/privacyhub&type=Date)](https://star-history.com/#privacypriority/privacyhub&Date)

---

<div align="center">

**Made with ❤️ for privacy awareness**

[⬆ Back to Top](#-privacyhubin---privacy-policy-analyser)

</div>
