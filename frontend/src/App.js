import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './App.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://t3nkbc4oeb.execute-api.us-east-1.amazonaws.com';

function App() {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [aiInsights, setAiInsights] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [healthGoals, setHealthGoals] = useState(null);
  const [aiStatus, setAiStatus] = useState(null);
  const [ruralHieData, setRuralHieData] = useState(null);
  const [ruralNetworkData, setRuralNetworkData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Load sample data and AI status on component mount
  useEffect(() => {
    loadSampleData();
    fetchAIStatus();
    fetchRuralHieData();
    fetchRuralNetworkData();
  }, []);

  const loadSampleData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/data`);
      const result = await response.json();
      
      if (result.success) {
        setHealthData(result.data);
      } else {
        setError('Failed to load sample data');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error loading sample data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', file);

    setLoading(true);
    setError('');
    setUploadStatus('');

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setHealthData(result.data);
        setUploadStatus(`Successfully uploaded ${result.count} records`);
      } else {
        setError(result.error || 'Failed to upload file');
      }
    } catch (err) {
      setError('Error uploading file');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch AI status
  const fetchAIStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai-status`);
      const result = await response.json();
      setAiStatus(result);
    } catch (err) {
      console.error('Error fetching AI status:', err);
    }
  };

  // Fetch Rural HIE data
  const fetchRuralHieData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rural-hie`);
      const result = await response.json();
      setRuralHieData(result);
    } catch (err) {
      console.error('Error fetching Rural HIE data:', err);
    }
  };

  // Fetch Rural Network data
  const fetchRuralNetworkData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rural-network`);
      const result = await response.json();
      setRuralNetworkData(result);
    } catch (err) {
      console.error('Error fetching Rural Network data:', err);
    }
  };

  // Generate AI insights
  const generateInsights = async () => {
    if (!healthData.length) {
      setError('No health data available for analysis');
      return;
    }

    setAiLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ healthData }),
      });

      const result = await response.json();

      if (result.success) {
        setAiInsights(result);
      } else {
        setError(result.error || 'Failed to generate insights');
      }
    } catch (err) {
      setError('Error generating AI insights');
      console.error('AI insights error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  // Generate health goals
  const generateGoals = async () => {
    if (!healthData.length) {
      setError('No health data available for goal generation');
      return;
    }

    setAiLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ healthData }),
      });

      const result = await response.json();

      if (result.success) {
        setHealthGoals(result);
      } else {
        setError(result.error || 'Failed to generate goals');
      }
    } catch (err) {
      setError('Error generating health goals');
      console.error('Health goals error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  // Prepare chart data
  const prepareChartData = () => {
    if (!healthData.length) return null;

    const labels = healthData.map(item => item.date);
    const heartRates = healthData.map(item => parseFloat(item.heartRate) || 0);
    const steps = healthData.map(item => parseFloat(item.steps) || 0);
    const weights = healthData.map(item => parseFloat(item.weight) || 0);

    return {
      labels,
      heartRates,
      steps,
      weights
    };
  };

  const chartData = prepareChartData();

  // Heart Rate Line Chart
  const heartRateChartData = chartData ? {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: chartData.heartRates,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  } : null;

  // Steps Bar Chart
  const stepsChartData = chartData ? {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Steps',
        data: chartData.steps,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  } : null;

  // Weight Pie Chart (showing weight distribution)
  const weightChartData = chartData ? {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Weight Distribution',
        data: chartData.weights,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PulseBoard - Health Data Dashboard</h1>
        <p>Upload your health data CSV or view sample data visualizations</p>
      </header>

      <main className="App-main">
        {/* Navigation Tabs */}
        <nav className="navigation-tabs">
          <button 
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Health Dashboard
          </button>
          <button 
            className={`tab-button ${activeTab === 'rural-hie' ? 'active' : ''}`}
            onClick={() => setActiveTab('rural-hie')}
          >
            Rural HIE Network
          </button>
        </nav>

        {activeTab === 'dashboard' && (
          <>
            {/* File Upload Section */}
            <section className="upload-section">
              <h2>Upload Health Data</h2>
              <div className="upload-container">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  disabled={loading}
                  className="file-input"
                />
                <button 
                  onClick={loadSampleData} 
                  disabled={loading}
                  className="sample-data-btn"
                >
                  Load Sample Data
                </button>
              </div>
          
          {loading && <div className="status loading">Loading...</div>}
          {error && <div className="status error">{error}</div>}
          {uploadStatus && <div className="status success">{uploadStatus}</div>}
        </section>

        {/* AI Insights Section */}
        {healthData.length > 0 && (
          <section className="ai-section">
            <h2>🤖 AI-Powered Health Analysis</h2>
            {aiStatus && (
              <div className="ai-status">
                <p>
                  <strong>AI Service:</strong> {aiStatus.service}
                  {!aiStatus.aiEnabled && (
                    <span className="ai-note"> (Add OPENAI_API_KEY for enhanced AI insights)</span>
                  )}
                </p>
              </div>
            )}
            
            <div className="ai-controls">
              <button 
                onClick={generateInsights}
                disabled={aiLoading}
                className="ai-btn insights-btn"
              >
                {aiLoading ? 'Analyzing...' : '📊 Generate Health Insights'}
              </button>
              <button 
                onClick={generateGoals}
                disabled={aiLoading}
                className="ai-btn goals-btn"
              >
                {aiLoading ? 'Creating Goals...' : '🎯 Generate Health Goals'}
              </button>
            </div>

            {/* AI Insights Display */}
            {aiInsights && aiInsights.success && (
              <div className="insights-container">
                <h3>🔍 Health Insights</h3>
                <div className="insights-grid">
                  <div className="insight-card overall-score">
                    <h4>Overall Health Score</h4>
                    <div className="score">{aiInsights.insights.overallScore}/10</div>
                    <p>{aiInsights.insights.summary}</p>
                  </div>
                  
                  {aiInsights.insights.trends && aiInsights.insights.trends.length > 0 && (
                    <div className="insight-card trends">
                      <h4>📈 Key Trends</h4>
                      <ul>
                        {aiInsights.insights.trends.map((trend, index) => (
                          <li key={index}>{trend}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {aiInsights.insights.recommendations && aiInsights.insights.recommendations.length > 0 && (
                    <div className="insight-card recommendations">
                      <h4>💡 Recommendations</h4>
                      <ul>
                        {aiInsights.insights.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {aiInsights.insights.risks && aiInsights.insights.risks.length > 0 && (
                    <div className="insight-card risks">
                      <h4>⚠️ Risk Factors</h4>
                      <ul>
                        {aiInsights.insights.risks.map((risk, index) => (
                          <li key={index}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="ai-metadata">
                  <small>
                    Analysis based on {aiInsights.dataPoints} data points
                    {aiInsights.aiPowered ? ' • Powered by AI' : ' • Mock analysis'}
                    {aiInsights.note && ` • ${aiInsights.note}`}
                  </small>
                </div>
              </div>
            )}

            {/* Health Goals Display */}
            {healthGoals && healthGoals.success && (
              <div className="goals-container">
                <h3>🎯 Personalized Health Goals</h3>
                <div className="goals-grid">
                  {healthGoals.goals.shortTerm && healthGoals.goals.shortTerm.length > 0 && (
                    <div className="goals-card short-term">
                      <h4>🚀 Short Term (1-4 weeks)</h4>
                      <ul>
                        {healthGoals.goals.shortTerm.map((goal, index) => (
                          <li key={index}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {healthGoals.goals.mediumTerm && healthGoals.goals.mediumTerm.length > 0 && (
                    <div className="goals-card medium-term">
                      <h4>📈 Medium Term (1-3 months)</h4>
                      <ul>
                        {healthGoals.goals.mediumTerm.map((goal, index) => (
                          <li key={index}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {healthGoals.goals.longTerm && healthGoals.goals.longTerm.length > 0 && (
                    <div className="goals-card long-term">
                      <h4>🏆 Long Term (3+ months)</h4>
                      <ul>
                        {healthGoals.goals.longTerm.map((goal, index) => (
                          <li key={index}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="goals-metadata">
                  <small>
                    Goals based on {healthGoals.basedOnData} data points
                    • Overall Score: {healthGoals.overallScore}
                  </small>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Charts Section */}
        {chartData && (
          <section className="charts-section">
            <h2>Health Data Visualizations</h2>
            <p>Showing {healthData.length} records</p>
            
            <div className="charts-grid">
              <div className="chart-container">
                <h3>Heart Rate Over Time</h3>
                {heartRateChartData && <Line data={heartRateChartData} options={chartOptions} />}
              </div>
              
              <div className="chart-container">
                <h3>Daily Steps</h3>
                {stepsChartData && <Bar data={stepsChartData} options={chartOptions} />}
              </div>
              
              <div className="chart-container">
                <h3>Weight Distribution</h3>
                {weightChartData && <Pie data={weightChartData} />}
              </div>
            </div>
          </section>
        )}

        {/* Data Table Section */}
        {healthData.length > 0 && (
          <section className="data-section">
            <h2>Raw Data</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    {Object.keys(healthData[0]).map(key => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {healthData.slice(0, 10).map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {healthData.length > 10 && (
                <p className="table-note">Showing first 10 records of {healthData.length}</p>
              )}
            </div>
          </section>
        )}
        </>
        )}

        {activeTab === 'rural-hie' && (
          <div className="rural-hie-dashboard">
            <header className="rural-hie-header">
              <h2>🏥 Rural Healthcare Interoperability Network</h2>
              <p>AMIA-focused analysis of rural healthcare connectivity and data exchange</p>
            </header>

            {ruralHieData && (
              <>
                {/* Rural Facilities Overview */}
                <section className="rural-metrics-section">
                  <h3>Rural Healthcare Facilities Overview</h3>
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <h4>Critical Access Hospitals</h4>
                      <div className="metric-value">{ruralHieData.ruralFacilities?.criticalAccessHospitals || 0}</div>
                      <p>Nationwide CAH facilities</p>
                    </div>
                    <div className="metric-card">
                      <h4>Rural Health Clinics</h4>
                      <div className="metric-value">{ruralHieData.ruralFacilities?.ruralHealthClinics || 0}</div>
                      <p>Certified RHC locations</p>
                    </div>
                    <div className="metric-card">
                      <h4>Connected Facilities</h4>
                      <div className="metric-value">{ruralHieData.ruralFacilities?.connectedFacilities || 0}</div>
                      <p>HIE-enabled facilities</p>
                    </div>
                    <div className="metric-card">
                      <h4>Pending Connections</h4>
                      <div className="metric-value">{ruralHieData.ruralFacilities?.pendingConnections || 0}</div>
                      <p>Awaiting HIE integration</p>
                    </div>
                  </div>
                </section>

                {/* Connectivity Status */}
                <section className="connectivity-section">
                  <h3>Rural Connectivity Status</h3>
                  <div className="connectivity-stats">
                    <div className="connectivity-item">
                      <span className="status-indicator fully-connected"></span>
                      <span>Fully Connected: {ruralHieData.ruralFacilities?.connectivityStatus?.fullyConnected || 0}%</span>
                    </div>
                    <div className="connectivity-item">
                      <span className="status-indicator partially-connected"></span>
                      <span>Partially Connected: {ruralHieData.ruralFacilities?.connectivityStatus?.partiallyConnected || 0}%</span>
                    </div>
                    <div className="connectivity-item">
                      <span className="status-indicator offline"></span>
                      <span>Offline: {ruralHieData.ruralFacilities?.connectivityStatus?.offline || 0}%</span>
                    </div>
                  </div>
                </section>

                {/* Interoperability Metrics */}
                <section className="interop-metrics-section">
                  <h3>Interoperability Metrics</h3>
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <h4>FHIR R4 Adoption</h4>
                      <div className="metric-value">{ruralHieData.interoperabilityMetrics?.fhirR4Adoption || 0}%</div>
                      <p>Rural FHIR implementation rate</p>
                    </div>
                    <div className="metric-card">
                      <h4>HIE Participation</h4>
                      <div className="metric-value">{ruralHieData.interoperabilityMetrics?.hieParticipation || 0}%</div>
                      <p>Active in health information exchange</p>
                    </div>
                    <div className="metric-card">
                      <h4>Data Exchange Volume</h4>
                      <div className="metric-value">{ruralHieData.interoperabilityMetrics?.dataExchangeVolume || 0}</div>
                      <p>Daily transactions (thousands)</p>
                    </div>
                    <div className="metric-card">
                      <h4>Reliability Score</h4>
                      <div className="metric-value">{ruralHieData.interoperabilityMetrics?.reliabilityScore || 0}%</div>
                      <p>Network uptime and reliability</p>
                    </div>
                  </div>
                </section>

                {/* Rural Challenges */}
                <section className="challenges-section">
                  <h3>Rural Healthcare IT Challenges</h3>
                  <div className="challenges-grid">
                    <div className="challenge-card">
                      <h4>🌐 Bandwidth Limitations</h4>
                      <p><strong>{ruralHieData.ruralChallenges?.bandwidthLimitations?.facilities || 0}</strong> facilities affected</p>
                      <p>Average: {ruralHieData.ruralChallenges?.bandwidthLimitations?.avgBandwidth || 'N/A'}</p>
                      <p>Peak usage issues: {ruralHieData.ruralChallenges?.bandwidthLimitations?.peakUsageIssues || 0}</p>
                    </div>
                    <div className="challenge-card">
                      <h4>👥 IT Staffing</h4>
                      <p><strong>{ruralHieData.ruralChallenges?.itStaffing?.understaffedFacilities || 0}</strong> understaffed facilities</p>
                      <p>Average IT staff: {ruralHieData.ruralChallenges?.itStaffing?.averageItStaff || 0}</p>
                      <p>Outsourced IT: {ruralHieData.ruralChallenges?.itStaffing?.outsourcedIt || 0}</p>
                    </div>
                    <div className="challenge-card">
                      <h4>⚖️ Compliance Gaps</h4>
                      <p>HIPAA Security: {ruralHieData.ruralChallenges?.complianceGaps?.hipaaSecurity || 0}</p>
                      <p>Meaningful Use: {ruralHieData.ruralChallenges?.complianceGaps?.meaningfulUse || 0}</p>
                      <p>Interop Standards: {ruralHieData.ruralChallenges?.complianceGaps?.interoperabilityStandards || 0}</p>
                    </div>
                  </div>
                </section>

                {/* SDOH Factors */}
                <section className="sdoh-section">
                  <h3>Social Determinants of Health - Rural Impact</h3>
                  <div className="sdoh-metrics">
                    <div className="sdoh-card">
                      <h4>🚗 Transportation Barriers</h4>
                      <div className="sdoh-value">{ruralHieData.sdohFactors?.transportationBarriers || 0}%</div>
                      <p>Patients affected by transport issues</p>
                    </div>
                    <div className="sdoh-card">
                      <h4>🌐 Internet Access</h4>
                      <div className="sdoh-value">{ruralHieData.sdohFactors?.internetAccess || 0}%</div>
                      <p>Reliable broadband availability</p>
                    </div>
                    <div className="sdoh-card">
                      <h4>🏥 Healthcare Deserts</h4>
                      <div className="sdoh-value">{ruralHieData.sdohFactors?.healthcareDeserts || 0}</div>
                      <p>Areas identified as underserved</p>
                    </div>
                    <div className="sdoh-card">
                      <h4>🛣️ Travel Distance</h4>
                      <div className="sdoh-value">{ruralHieData.sdohFactors?.avgTravelDistance || 0} mi</div>
                      <p>Average to nearest hospital</p>
                    </div>
                  </div>
                </section>
              </>
            )}

            {ruralNetworkData && (
              <section className="network-topology-section">
                <h3>Rural Network Topology Sample</h3>
                <div className="facility-network">
                  {ruralNetworkData.networkTopology?.map((facility, index) => (
                    <div key={index} className={`facility-card challenge-level-${Math.floor(facility.challengeScore || 0)}`}>
                      <div className="facility-header">
                        <h4>{facility.name}</h4>
                        <span className={`status-badge ${facility.connectivity?.status || 'unknown'}`}>
                          {facility.connectivity?.status || 'Unknown'}
                        </span>
                      </div>
                      <div className="facility-details">
                        <p><strong>Location:</strong> {facility.location?.county}, {facility.location?.state}</p>
                        <p><strong>Population Served:</strong> {facility.location?.population?.toLocaleString()}</p>
                        <p><strong>EHR System:</strong> {facility.ehrSystem}</p>
                        <p><strong>FHIR Capability:</strong> {facility.fhirCapability}</p>
                        <p><strong>Bandwidth:</strong> {facility.connectivity?.bandwidth || 'N/A'}</p>
                        <p><strong>Challenge Score:</strong> {facility.challengeScore}/10</p>
                      </div>
                      <div className="services">
                        <strong>Services:</strong>
                        {facility.services?.map((service, sIndex) => (
                          <span key={sIndex} className="service-tag">{service.replace('_', ' ')}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;