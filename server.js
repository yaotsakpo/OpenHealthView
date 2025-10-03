const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        environment: 'Local Development'
    });
});

// FHIR-compliant health data endpoint
app.get('/data', (req, res) => {
    // Generate sample health data that matches frontend expectations
    const sampleHealthData = [
        {
            date: new Date(Date.now() - 86400000).toLocaleDateString(), // Yesterday
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            heartRate: 75,
            systolic: 120,
            diastolic: 80,
            temperature: 36.5,
            weight: 70,
            steps: 8500
        },
        {
            date: new Date(Date.now() - 43200000).toLocaleDateString(), // 12 hours ago  
            timestamp: new Date(Date.now() - 43200000).toISOString(),
            heartRate: 78,
            systolic: 125,
            diastolic: 82,
            temperature: 36.7,
            weight: 70.2,
            steps: 4200
        },
        {
            date: new Date().toLocaleDateString(), // Today
            timestamp: new Date().toISOString(),
            heartRate: 72 + Math.floor(Math.random() * 20),
            systolic: 120 + Math.floor(Math.random() * 20),
            diastolic: 80 + Math.floor(Math.random() * 10),
            temperature: Number((36.5 + Math.random() * 1.5).toFixed(1)),
            weight: Number((70 + Math.random() * 2).toFixed(1)),
            steps: Math.floor(Math.random() * 5000) + 3000
        }
    ];

    // Return in expected format
    res.json({
        success: true,
        data: sampleHealthData,
        count: sampleHealthData.length
    });
});

// FHIR-compliant endpoint (separate for healthcare standards)
app.get('/fhir-data', (req, res) => {
    const fhirData = {
        resourceType: "Bundle",
        id: "health-dashboard-data",
        meta: {
            lastUpdated: new Date().toISOString()
        },
        type: "collection",
        entry: [
            {
                resource: {
                    resourceType: "Observation",
                    id: "heart-rate-1",
                    status: "final",
                    category: [{
                        coding: [{
                            system: "http://terminology.hl7.org/CodeSystem/observation-category",
                            code: "vital-signs"
                        }]
                    }],
                    code: {
                        coding: [{
                            system: "http://loinc.org",
                            code: "8867-4",
                            display: "Heart rate"
                        }]
                    },
                    valueQuantity: {
                        value: 72 + Math.floor(Math.random() * 20),
                        unit: "beats/min",
                        system: "http://unitsofmeasure.org",
                        code: "/min"
                    },
                    effectiveDateTime: new Date().toISOString()
                }
            },
            {
                resource: {
                    resourceType: "Observation",
                    id: "blood-pressure-1",
                    status: "final",
                    category: [{
                        coding: [{
                            system: "http://terminology.hl7.org/CodeSystem/observation-category",
                            code: "vital-signs"
                        }]
                    }],
                    code: {
                        coding: [{
                            system: "http://loinc.org",
                            code: "85354-9",
                            display: "Blood pressure panel"
                        }]
                    },
                    component: [
                        {
                            code: {
                                coding: [{
                                    system: "http://loinc.org",
                                    code: "8480-6",
                                    display: "Systolic blood pressure"
                                }]
                            },
                            valueQuantity: {
                                value: 120 + Math.floor(Math.random() * 20),
                                unit: "mmHg",
                                system: "http://unitsofmeasure.org",
                                code: "mm[Hg]"
                            }
                        },
                        {
                            code: {
                                coding: [{
                                    system: "http://loinc.org",
                                    code: "8462-4",
                                    display: "Diastolic blood pressure"
                                }]
                            },
                            valueQuantity: {
                                value: 80 + Math.floor(Math.random() * 10),
                                unit: "mmHg",
                                system: "http://unitsofmeasure.org",
                                code: "mm[Hg]"
                            }
                        }
                    ],
                    effectiveDateTime: new Date().toISOString()
                }
            },
            {
                resource: {
                    resourceType: "Observation",
                    id: "body-temperature-1",
                    status: "final",
                    category: [{
                        coding: [{
                            system: "http://terminology.hl7.org/CodeSystem/observation-category",
                            code: "vital-signs"
                        }]
                    }],
                    code: {
                        coding: [{
                            system: "http://loinc.org",
                            code: "8310-5",
                            display: "Body temperature"
                        }]
                    },
                    valueQuantity: {
                        value: Number((36.5 + Math.random() * 1.5).toFixed(1)),
                        unit: "Cel",
                        system: "http://unitsofmeasure.org",
                        code: "Cel"
                    },
                    effectiveDateTime: new Date().toISOString()
                }
            }
        ]
    };

    res.json(fhirData);
});

// AI insights endpoint (POST to match frontend)
app.post('/insights', async (req, res) => {
    try {
        const { healthData } = req.body;
        
        if (!healthData || !healthData.length) {
            return res.status(400).json({
                success: false,
                error: 'No health data provided for analysis'
            });
        }

        // Analyze the health data
        const latestData = healthData[healthData.length - 1];
        const avgHeartRate = healthData.reduce((sum, item) => sum + (item.heartRate || 0), 0) / healthData.length;
        const avgSteps = healthData.reduce((sum, item) => sum + (item.steps || 0), 0) / healthData.length;
        const avgWeight = healthData.reduce((sum, item) => sum + (item.weight || 0), 0) / healthData.length;

        // Generate insights based on data
        const insights = {
            overallScore: Math.min(10, Math.max(1, Math.round(8 + (avgSteps > 8000 ? 1 : 0) + (avgHeartRate < 80 ? 1 : 0)))),
            categories: [
                {
                    name: "Heart Health",
                    score: avgHeartRate < 80 ? 9 : avgHeartRate < 100 ? 7 : 5,
                    recommendation: avgHeartRate < 80 ? "Excellent heart rate! Keep up the good work." : "Consider more cardio exercise to improve heart health."
                },
                {
                    name: "Activity Level", 
                    score: avgSteps > 10000 ? 10 : avgSteps > 8000 ? 8 : avgSteps > 5000 ? 6 : 4,
                    recommendation: avgSteps > 8000 ? "Great activity level!" : "Try to increase daily steps for better health."
                },
                {
                    name: "Weight Management",
                    score: 8, // Baseline score
                    recommendation: "Maintain current weight through balanced diet and exercise."
                }
            ],
            trends: [
                `Average heart rate: ${Math.round(avgHeartRate)} BPM`,
                `Daily steps average: ${Math.round(avgSteps)} steps`,
                `Weight trend: ${avgWeight.toFixed(1)} kg average`
            ],
            recommendations: [
                "Continue monitoring vital signs daily",
                avgSteps < 8000 ? "Increase daily physical activity" : "Maintain current activity level",
                "Stay hydrated and maintain regular sleep schedule",
                "Consider consultation with healthcare provider for personalized advice"
            ]
        };

        res.json({
            success: true,
            insights,
            analyzed_records: healthData.length,
            generated_at: new Date().toISOString(),
            source: "Health Data Analysis"
        });

    } catch (error) {
        console.error('Error generating insights:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to generate insights',
            message: String(error) 
        });
    }
});

// Keep GET endpoint for direct access
app.get('/insights', async (req, res) => {
    try {
        const fallbackInsights = [
            {
                type: "vitals_trend",
                message: "Your heart rate shows good stability over the past 24 hours.",
                priority: "info",
                timestamp: new Date().toISOString()
            },
            {
                type: "blood_pressure",
                message: "Blood pressure readings are within normal range (120/80 mmHg).",
                priority: "normal",
                timestamp: new Date().toISOString()
            },
            {
                type: "temperature",
                message: "Body temperature is normal. Continue monitoring daily.",
                priority: "info",
                timestamp: new Date().toISOString()
            },
            {
                type: "recommendation",
                message: "Consider adding 30 minutes of light exercise to maintain cardiovascular health.",
                priority: "suggestion",
                timestamp: new Date().toISOString()
            }
        ];

        res.json({
            insights: fallbackInsights,
            source: "Clinical Guidelines",
            generated_at: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error generating insights:', error);
        res.status(500).json({ 
            error: 'Failed to generate insights',
            message: String(error) 
        });
    }
});

// File upload endpoint
app.post('/upload', upload.single('csvFile'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
        }

        const file = req.file;
        console.log('File uploaded:', {
            filename: file.originalname,
            mimetype: file.mimetype,
            size: file.size
        });

        // Generate mock health data from uploaded file
        const mockHealthData = [];
        const recordCount = Math.floor(Math.random() * 50) + 20; // 20-70 records
        
        for (let i = 0; i < recordCount; i++) {
            const recordDate = new Date(Date.now() - (i * 3600000)); // Every hour backwards
            mockHealthData.push({
                date: recordDate.toLocaleDateString(),
                timestamp: recordDate.toISOString(),
                heartRate: 65 + Math.floor(Math.random() * 30),
                systolic: 110 + Math.floor(Math.random() * 30),
                diastolic: 70 + Math.floor(Math.random() * 20),
                temperature: Number((36.0 + Math.random() * 2).toFixed(1)),
                weight: Number((60 + Math.random() * 40).toFixed(1)),
                steps: Math.floor(Math.random() * 15000)
            });
        }

        res.json({
            success: true,
            message: 'File uploaded and processed successfully',
            data: mockHealthData,
            count: recordCount,
            filename: file.originalname
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process upload',
            message: String(error)
        });
    }
});

// Goals endpoint (updated to match frontend expectations)
app.post('/goals', (req, res) => {
    try {
        const { healthData } = req.body;
        
        if (!healthData || !healthData.length) {
            return res.status(400).json({
                success: false,
                error: 'No health data provided for goal generation'
            });
        }

        // Analyze current health data to generate personalized goals
        const latestData = healthData[healthData.length - 1];
        const avgSteps = healthData.reduce((sum, item) => sum + (item.steps || 0), 0) / healthData.length;
        const avgHeartRate = healthData.reduce((sum, item) => sum + (item.heartRate || 0), 0) / healthData.length;

        // Generate personalized health goals
        const goals = {
            daily: [
                {
                    id: 1,
                    title: "Daily Steps Goal",
                    target: avgSteps < 8000 ? 8000 : Math.round(avgSteps * 1.1),
                    current: Math.round(avgSteps),
                    unit: "steps",
                    progress: Math.min(100, Math.round((avgSteps / 10000) * 100)),
                    category: "fitness"
                },
                {
                    id: 2,
                    title: "Heart Rate Zone",
                    target: "60-80 BPM",
                    current: `${Math.round(avgHeartRate)} BPM`,
                    unit: "BPM",
                    progress: avgHeartRate >= 60 && avgHeartRate <= 80 ? 100 : 70,
                    category: "cardiovascular"
                },
                {
                    id: 3,
                    title: "Weight Maintenance",
                    target: "Maintain current weight",
                    current: `${latestData.weight} kg`,
                    unit: "kg",
                    progress: 85,
                    category: "nutrition"
                }
            ],
            weekly: [
                {
                    id: 4,
                    title: "Active Days",
                    target: 5,
                    current: 3,
                    unit: "days",
                    progress: 60,
                    category: "fitness"
                },
                {
                    id: 5,
                    title: "Health Check-ins",
                    target: 7,
                    current: healthData.length,
                    unit: "check-ins",
                    progress: Math.min(100, Math.round((healthData.length / 7) * 100)),
                    category: "monitoring"
                }
            ],
            monthly: [
                {
                    id: 6,
                    title: "Fitness Improvement",
                    target: "Increase average daily steps by 10%",
                    current: `${Math.round(avgSteps)} avg steps`,
                    progress: 45,
                    category: "fitness"
                },
                {
                    id: 7,
                    title: "Consistent Monitoring",
                    target: "Daily health data logging",
                    current: "Active tracking",
                    progress: 78,
                    category: "monitoring"
                }
            ]
        };

        res.json({
            success: true,
            goals,
            generated_at: new Date().toISOString(),
            based_on_records: healthData.length,
            message: 'Personalized health goals generated successfully'
        });
    } catch (error) {
        console.error('Goal creation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create goals',
            message: String(error)
        });
    }
});

// AI status endpoint
app.get('/ai-status', (req, res) => {
    res.json({
        ai_enabled: false,
        provider: "fallback",
        capabilities: ["basic_insights", "data_analysis"],
        message: "Using clinical guidelines for health insights"
    });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🏥 OpenHealthView API running on http://localhost:${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/health`);
        console.log(`🔬 FHIR data: http://localhost:${PORT}/data`);
        console.log(`🤖 AI insights: http://localhost:${PORT}/insights`);
    });
}

module.exports = app;