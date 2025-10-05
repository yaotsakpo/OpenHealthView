# OpenHealthView - Rural Healthcare Interoperability Platform# OpenHealthView - Rural Healthcare Interoperability Platform# OpenHealthView - Serverless Health Data Platform



A serverless rural healthcare data platform built with React and Node.js, designed to monitor Critical Access Hospitals, Rural Health Clinics, and Health Professional Shortage Areas with automated government data integration.



## 🏥 FeaturesA serverless rural healthcare data platform built with React and Node.js, designed to monitor Critical Access Hospitals, Rural Health Clinics, and Health Professional Shortage Areas with automated government data integration.A modern, serverless health data analytics platform built for AWS Lambda. Provides healthcare professionals and patients with powerful tools to visualize, analyze, and manage health data effectively.



- **Rural Health Analytics**: Real-time monitoring of Critical Access Hospitals and Rural Health Clinics

- **Government Data Integration**: Automated daily updates from CMS and HRSA APIs

- **Serverless Architecture**: AWS Lambda + EventBridge for automated scheduling## 🏥 Key Features## 🏥 Features

- **Healthcare Interoperability**: FHIR-compliant rural health metrics

- **Admin Monitoring**: Data pipeline status and manual update controls



## 🚀 Architecture- **Rural Health Analytics**: Real-time monitoring of 1,320+ Critical Access Hospitals and 4,400+ Rural Health Clinics- **Interactive Health Dashboard**: Real-time data visualization with Chart.js



### Backend (AWS Lambda)- **Government Data Integration**: Automated daily updates from CMS and HRSA with graceful fallback systems- **CSV Data Processing**: Upload and analyze health data files  

- `lambda-handler.js` - Serverless function with all API endpoints

- `serverless.yml` - AWS infrastructure configuration  - **Serverless AWS Architecture**: EventBridge scheduling + Lambda functions for 99.9% uptime- **AI-Powered Insights**: Automated health trend analysis and recommendations

- `server.js` - Local development server

- `scheduled-update.js` - EventBridge scheduled data updates- **Healthcare Interoperability**: FHIR-compliant data exchange and connectivity metrics- **FHIR Compliance**: Adherent to HL7 FHIR R4 healthcare standards



### Frontend (React)- **Admin Monitoring**: Real-time data pipeline status and manual update controls- **Serverless Architecture**: Scalable AWS Lambda + S3 deployment

- Modern React application with rural health dashboard

- Chart.js integration for facility data visualization- **Cost-Effective**: $0 monthly operating cost within AWS free tier- **Cost-Effective**: 90% cost reduction vs traditional hosting

- Real-time connectivity with AWS Lambda API

- Professional healthcare dashboard interface



### Data Services## 🛠 Technology Stack## 🚀 Architecture

- `data-services/dataUpdateService.js` - Automated CSV downloads and caching

- `data-services/ruralDataService.js` - Rural health metrics calculation



## 📊 API Endpoints- **Frontend**: React.js + Chart.js for interactive healthcare dashboards### Backend (AWS Lambda)



| Endpoint | Method | Description |- **Backend**: Node.js + Express with serverless architecture- `lambda-handler.js` - Serverless function with all API endpoints

|----------|---------|-------------|

| `/health` | GET | System health check |- **Cloud Infrastructure**: AWS Lambda + API Gateway + EventBridge + S3 + CloudFront- `serverless.yml` - AWS infrastructure configuration  

| `/rural-hie` | GET | Rural healthcare interoperability metrics |

| `/rural-network` | GET | Rural facility network topology |- **Data Sources**: CMS Provider Data, HRSA Health Professional Shortage Areas- `server.js` - Local development server

| `/admin/data-status` | GET | Data pipeline status and source information |

| `/admin/update-data` | POST | Trigger manual data update |- **Standards**: FHIR R4 compliant for healthcare interoperability



## 🔄 Automated Data Pipeline### Frontend (React)



### Data Sources## 🚀 Architecture- Modern React application with responsive design

- **CMS Provider Data**: Critical Access Hospitals and Rural Health Clinics

- **HRSA Data**: Health Professional Shortage Areas- Chart.js integration for health data visualization

- **Fallback System**: Research-based data when government APIs are unavailable

### Backend (AWS Lambda)- File upload and CSV processing capabilities

### Update Schedule

- **Automated**: Daily via AWS EventBridge```- Professional healthcare dashboard interface

- **Manual**: On-demand via admin API endpoint

- **Caching**: 24-hour cache with graceful fallback┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐



## 🛠️ Quick Start│   API Gateway   │────│  Lambda Functions │────│   EventBridge   │## 📊 API Endpoints



### Local Development│ (HTTP Endpoints)│    │ • API Handler    │    │ (Daily Schedule)│

```bash

# Install dependencies│                 │    │ • Data Updater   │    │                 │| Endpoint | Method | Description |

npm install

cd frontend && npm install && cd ..└─────────────────┘    └──────────────────┘    └─────────────────┘|----------|---------|-------------|



# Start backend server                                │                        │| `/health` | GET | System health check |

npm start

                                │                        ▼| `/data` | GET | Retrieve FHIR-compliant health data |

# Start frontend (in another terminal)

cd frontend && npm start                       ┌──────────────────┐    ┌─────────────────┐| `/upload` | POST | Process CSV health data files |

```

                       │   Govt APIs      │    │   CloudWatch    │| `/insights` | POST | Generate AI-powered health insights |

Visit `http://localhost:3000` to access the dashboard.

                       │ • CMS Data       │    │   (Monitoring)  │| `/goals` | POST | Create personalized health goals |

### AWS Deployment

```bash                       │ • HRSA Data      │    │                 │

# Deploy backend to Lambda

npm run deploy                       └──────────────────┘    └─────────────────┘## 🛠️ Quick Start



# Build and deploy frontend```

cd frontend

npm run build### Prerequisites

# Upload build/ contents to S3 and invalidate CloudFront

```### Frontend (S3 + CloudFront)- Node.js 18+



## 🌐 Live Platform- React application with rural health dashboards- AWS CLI configured



- **Frontend**: https://openhealthviews.com- Chart.js visualizations for facility metrics  - Serverless Framework: `npm install -g serverless`

- **Backend API**: https://t3nkbc4oeb.execute-api.us-east-1.amazonaws.com

- Real-time connectivity with AWS Lambda API

## 📈 Current Metrics

- CloudFront global CDN for fast loading### Local Development

### Data Coverage

- **Critical Access Hospitals**: 1,320 facilities tracked```bash

- **Rural Health Clinics**: 4,400+ clinics monitored  

- **Health Professional Shortage Areas**: 7,800+ areas identified## 📊 API Endpoints# Install dependencies



### Infrastructurenpm install

- **Cost**: $0/month (AWS free tier eligible)

- **Uptime**: 99.9% (AWS Lambda SLA)| Endpoint | Method | Description |cd frontend && npm install && cd ..

- **Automated Updates**: EventBridge scheduling every 24 hours

|----------|---------|-------------|

## 🏗️ Project Structure

| `/health` | GET | System health check |# Start backend server

```

OpenHealthView/| `/rural-hie` | GET | Rural healthcare interoperability metrics |npm start

├── lambda-handler.js          # Main AWS Lambda handler

├── serverless.yml            # AWS deployment configuration| `/rural-network` | GET | Rural facility network topology |

├── scheduled-update.js       # EventBridge scheduled function

├── server.js                # Local development server| `/admin/data-status` | GET | Data pipeline status and source information |# Start frontend (in another terminal)

├── package.json             # Backend dependencies

├── data-services/           # Data processing services| `/admin/update-data` | POST | Trigger manual data update |cd frontend && npm start

│   ├── dataUpdateService.js # Government API integration

│   └── ruralDataService.js  # Rural health calculations```

├── frontend/               # React application

│   ├── src/## 🔄 Automated Data Pipeline

│   │   ├── App.js         # Main dashboard component

│   │   ├── App.css        # Application stylingVisit `http://localhost:3000` to access the dashboard.

│   │   └── index.js       # React entry point

│   ├── public/            # Static assets### Data Sources

│   └── package.json       # Frontend dependencies

└── README.md              # This file- **CMS Provider Data**: Critical Access Hospitals and Rural Health Clinics### AWS Deployment

```

- **HRSA Data**: Health Professional Shortage Areas```bash

## 🔒 Security & Compliance

- **Fallback System**: Research-based data when government APIs are unavailable# Deploy backend to Lambda

- **HTTPS**: All endpoints use SSL/TLS encryption

- **CORS**: Properly configured cross-origin resource sharingserverless deploy

- **AWS IAM**: Principle of least privilege access

- **FHIR Compliance**: Adherent to HL7 FHIR R4 standards### Update Schedule

- **Data Privacy**: No PHI stored, aggregate data only

- **Automated**: Daily at 3 AM UTC via AWS EventBridge# Build and deploy frontend to S3

## 📝 License

- **Manual**: On-demand via admin API endpointcd frontend

MIT License - Open source healthcare technology for advancing rural healthcare through accessible digital solutions.
- **Caching**: 24-hour cache with graceful fallback to stale datanpm run build

aws s3 sync build/ s3://your-domain-bucket

### Error Handling```

- Government API 404 errors handled gracefully

- Automatic fallback to research-based aggregate data## 🌐 Live Demo

- Comprehensive logging and monitoring

- **Frontend**: https://openhealthviews.com

## 🚀 Deployment- **Backend API**: https://t3nkbc4oeb.execute-api.us-east-1.amazonaws.com



### Prerequisites## 📈 Health Data Standards

- AWS CLI configured with appropriate permissions

- Node.js 18+ for local developmentUses FHIR R4 compliant data structures for healthcare interoperability:



### Deploy Backend```json

```bash{

npm install  "resourceType": "Observation",

npm run deploy  "status": "final",

```  "category": [{"text": "vital-signs"}],

  "code": {"text": "Heart Rate"},

### Deploy Frontend  "valueQuantity": {"value": 72, "unit": "bpm"},

```bash  "effectiveDateTime": "2025-10-03T10:00:00Z",

cd frontend  "subject": {"reference": "Patient/example"}

npm install}

npm run build```

# Upload build/ contents to S3 bucket

# Invalidate CloudFront cache## 💰 Cost-Effective Solution

```

| Service | Monthly Cost |

### Environment Variables|---------|-------------|

```bash| AWS Lambda | $0-5 |

# AWS Lambda automatically provides:| S3 Static Hosting | $1-3 |

AWS_LAMBDA_FUNCTION_NAME=openhealthview-api-prod-api| API Gateway | $3-10 |

AWS_REGION=us-east-1| Route 53 DNS | $0.50 |

NODE_ENV=production| **Total** | **$5-15** |

```

*Compare to $70-105/month with traditional Docker/ECS hosting*

## 📈 Current Metrics

## 🔒 Security Features

### Infrastructure

- **Uptime**: 99.9% (AWS Lambda SLA)- Input validation and sanitization on all endpoints

- **Latency**: <500ms average response time- Secure file upload processing with type validation

- **Scalability**: Auto-scales to handle traffic spikes- CORS configuration for cross-origin security

- **Cost**: $0/month within AWS free tier limits- AWS IAM role-based access control

- Production-ready error handling

### Data Coverage

- **Critical Access Hospitals**: 1,320 facilities tracked## 🏗️ Project Structure

- **Rural Health Clinics**: 4,400+ clinics monitored

- **Health Professional Shortage Areas**: 7,800+ areas identified```

- **Geographic Coverage**: All 50 US statesOpenHealthView/

├── lambda-handler.js       # Main serverless backend

## 🔐 Security & Compliance├── serverless.yml         # AWS deployment config

├── server.js              # Local development server

- **HTTPS**: All endpoints use SSL/TLS encryption├── package.json           # Backend dependencies

- **CORS**: Properly configured cross-origin resource sharing├── frontend/              # React application

- **AWS IAM**: Principle of least privilege access│   ├── src/

- **Data Privacy**: No PHI stored, aggregate data only│   │   ├── App.js        # Main dashboard component

- **FHIR Compliance**: Adherent to HL7 FHIR R4 standards│   │   ├── App.css       # Application styling

│   │   └── index.js      # React entry point

## 📋 Local Development│   ├── public/           # Static assets

│   └── package.json      # Frontend dependencies

### Backend└── README.md             # This file

```bash```

npm install

npm start  # Runs local server on port 3001## 🎯 Use Cases

```

### Healthcare Professionals

### Frontend  - Patient data visualization and trend analysis

```bash- FHIR-compliant data management

cd frontend- Health insights generation and reporting

npm install

npm start  # Runs development server on port 3000### EB-2 NIW Demonstration

```- Showcases healthcare technology innovation

- Demonstrates cost-effective scalable solutions

### Testing- Professional-grade healthcare platform

```bash- Modern serverless architecture expertise

# Backend health check

curl http://localhost:3001/health## 📝 License



# Rural health dataMIT License - Open source healthcare technology for advancing patient care through accessible digital solutions.

curl http://localhost:3001/rural-hie

```---



## 🏗 File Structure**OpenHealthView** - Advancing healthcare through innovative, cost-effective technology solutions.

```
├── data-services/           # Data processing and government API integration
│   ├── dataUpdateService.js # Automated CSV downloads and caching
│   └── ruralDataService.js  # Rural health metrics calculation
├── frontend/               # React application
│   ├── src/               # React components and logic  
│   └── public/           # Static assets
├── lambda-handler.js      # AWS Lambda entry point
├── server.js             # Local development server
├── serverless.yml        # AWS infrastructure as code
├── scheduled-update.js   # EventBridge scheduled function
└── package.json         # Dependencies and scripts
```

## 📚 Related Documentation

- [AWS Deployment Guide](AWS-DEPLOYMENT.md)
- [Deployment Success Summary](DEPLOYMENT-SUCCESS.md)
- [Setup Automation Script](setup-automation.sh)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper documentation
4. Test locally and ensure deployment works
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support with deployment or development:
1. Check the AWS CloudWatch logs for backend issues
2. Use browser developer tools for frontend debugging  
3. Verify AWS credentials and permissions for deployment issues
4. Review government API status if data updates fail

---

**Live Platform**: Available at production URL with automated daily data updates and 24/7 monitoring.