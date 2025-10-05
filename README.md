# OpenHealthView - Rural Healthcare Interoperability Platform

A serverless rural healthcare data platform built with React and Node.js, designed to monitor Critical Access Hospitals, Rural Health Clinics, and Health Professional Shortage Areas with automated government data integration.

## 🏥 Features

- **Rural Health Analytics**: Real-time monitoring of 1,320+ Critical Access Hospitals and 4,400+ Rural Health Clinics
- **Government Data Integration**: Automated daily updates from CMS and HRSA with graceful fallback systems
- **Serverless AWS Architecture**: EventBridge scheduling + Lambda functions for 99.9% uptime
- **Healthcare Interoperability**: FHIR-compliant data exchange and connectivity metrics
- **Admin Monitoring**: Real-time data pipeline status and manual update controls
- **Cost-Effective**: $0 monthly operating cost within AWS free tier

## 🚀 Architecture

### Backend (AWS Lambda)

- `lambda-handler.js` - Serverless function with all API endpoints
- `serverless.yml` - AWS infrastructure configuration  
- `server.js` - Local development server
- `scheduled-update.js` - EventBridge scheduled data updates

### Frontend (React)

- Modern React application with rural health dashboard
- Chart.js integration for facility data visualization
- Real-time connectivity with AWS Lambda API
- Professional healthcare dashboard interface

### Data Services

- `data-services/dataUpdateService.js` - Automated CSV downloads and caching
- `data-services/ruralDataService.js` - Rural health metrics calculation

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/health` | GET | System health check |
| `/rural-hie` | GET | Rural healthcare interoperability metrics |
| `/rural-network` | GET | Rural facility network topology |
| `/admin/data-status` | GET | Data pipeline status and source information |
| `/admin/update-data` | POST | Trigger manual data update |

## 🔄 Automated Data Pipeline

### Data Sources

- **CMS Provider Data**: Critical Access Hospitals and Rural Health Clinics
- **HRSA Data**: Health Professional Shortage Areas
- **Fallback System**: Research-based data when government APIs are unavailable

### Update Schedule

- **Automated**: Daily via AWS EventBridge at 3 AM UTC
- **Manual**: On-demand via admin API endpoint
- **Caching**: 24-hour cache with graceful fallback

## 🛠️ Technology Stack

- **Frontend**: React.js + Chart.js for interactive healthcare dashboards
- **Backend**: Node.js + Express with serverless architecture
- **Cloud Infrastructure**: AWS Lambda + API Gateway + EventBridge + S3 + CloudFront
- **Data Sources**: CMS Provider Data, HRSA Health Professional Shortage Areas
- **Standards**: FHIR R4 compliant for healthcare interoperability

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- AWS CLI configured
- Serverless Framework: `npm install -g serverless`

### Local Development

```bash
# Install dependencies
npm install
cd frontend && npm install && cd ..

# Start backend server
npm start

# Start frontend (in another terminal)
cd frontend && npm start
```

Visit `http://localhost:3000` to access the dashboard.

### AWS Deployment

```bash
# Deploy backend to Lambda
npm run deploy

# Build and deploy frontend
cd frontend
npm run build
# Upload build/ contents to S3 and invalidate CloudFront
```

## 🌐 Live Platform

- **Frontend**: https://openhealthviews.com
- **Backend API**: https://t3nkbc4oeb.execute-api.us-east-1.amazonaws.com

## 📈 Current Metrics

- **Critical Access Hospitals**: 1,320+ facilities monitored
- **Rural Health Clinics**: 4,400+ facilities tracked
- **HRSA Shortage Areas**: Real-time professional shortage data
- **Uptime**: 99.9% availability via AWS Lambda
- **Cost**: $0 monthly within AWS free tier limits

## 🔧 Architecture Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Gateway   │────│  Lambda Functions │────│   EventBridge   │
│ (HTTP Endpoints)│    │ • API Handler    │    │ (Daily Schedule)│
│                 │    │ • Data Updater   │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                │                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Govt APIs      │    │   CloudWatch    │
                       │ • CMS Data       │    │   (Monitoring)  │
                       │ • HRSA Data      │    │                 │
                       └──────────────────┘    └─────────────────┘
```

### Frontend (S3 + CloudFront)

- React application with rural health dashboards
- Chart.js visualizations for facility metrics  
- Real-time connectivity with AWS Lambda API
- CloudFront global CDN for fast loading

## 📄 License

MIT License - Supporting rural healthcare through open-source technology.

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests for improvements to rural healthcare data accessibility.

---

**OpenHealthView** - Empowering rural healthcare through automated data integration and serverless architecture.