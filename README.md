# OpenHealthView - Serverless Health Data Platform

A modern, serverless health data analytics platform built for AWS Lambda. Provides healthcare professionals and patients with powerful tools to visualize, analyze, and manage health data effectively.

## 🏥 Features

- **Interactive Health Dashboard**: Real-time data visualization with Chart.js
- **CSV Data Processing**: Upload and analyze health data files  
- **AI-Powered Insights**: Automated health trend analysis and recommendations
- **FHIR Compliance**: Adherent to HL7 FHIR R4 healthcare standards
- **Serverless Architecture**: Scalable AWS Lambda + S3 deployment
- **Cost-Effective**: 90% cost reduction vs traditional hosting

## 🚀 Architecture

### Backend (AWS Lambda)
- `lambda-handler.js` - Serverless function with all API endpoints
- `serverless.yml` - AWS infrastructure configuration  
- `server.js` - Local development server

### Frontend (React)
- Modern React application with responsive design
- Chart.js integration for health data visualization
- File upload and CSV processing capabilities
- Professional healthcare dashboard interface

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/health` | GET | System health check |
| `/data` | GET | Retrieve FHIR-compliant health data |
| `/upload` | POST | Process CSV health data files |
| `/insights` | POST | Generate AI-powered health insights |
| `/goals` | POST | Create personalized health goals |

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
serverless deploy

# Build and deploy frontend to S3
cd frontend
npm run build
aws s3 sync build/ s3://your-domain-bucket
```

## 🌐 Live Demo

- **Frontend**: https://openhealthviews.com
- **Backend API**: https://t3nkbc4oeb.execute-api.us-east-1.amazonaws.com

## 📈 Health Data Standards

Uses FHIR R4 compliant data structures for healthcare interoperability:

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [{"text": "vital-signs"}],
  "code": {"text": "Heart Rate"},
  "valueQuantity": {"value": 72, "unit": "bpm"},
  "effectiveDateTime": "2025-10-03T10:00:00Z",
  "subject": {"reference": "Patient/example"}
}
```

## 💰 Cost-Effective Solution

| Service | Monthly Cost |
|---------|-------------|
| AWS Lambda | $0-5 |
| S3 Static Hosting | $1-3 |
| API Gateway | $3-10 |
| Route 53 DNS | $0.50 |
| **Total** | **$5-15** |

*Compare to $70-105/month with traditional Docker/ECS hosting*

## 🔒 Security Features

- Input validation and sanitization on all endpoints
- Secure file upload processing with type validation
- CORS configuration for cross-origin security
- AWS IAM role-based access control
- Production-ready error handling

## 🏗️ Project Structure

```
OpenHealthView/
├── lambda-handler.js       # Main serverless backend
├── serverless.yml         # AWS deployment config
├── server.js              # Local development server
├── package.json           # Backend dependencies
├── frontend/              # React application
│   ├── src/
│   │   ├── App.js        # Main dashboard component
│   │   ├── App.css       # Application styling
│   │   └── index.js      # React entry point
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
└── README.md             # This file
```

## 🎯 Use Cases

### Healthcare Professionals
- Patient data visualization and trend analysis
- FHIR-compliant data management
- Health insights generation and reporting

## 📝 License

MIT License - Open source healthcare technology for advancing patient care through accessible digital solutions.

---

**OpenHealthView** - Advancing healthcare through innovative, cost-effective technology solutions.
