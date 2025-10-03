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

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [aiInsights, setAiInsights] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [healthGoals, setHealthGoals] = useState(null);
  const [aiStatus, setAiStatus] = useState(null);

  // Load sample data and AI status on component mount
  useEffect(() => {
    loadSampleData();
    fetchAIStatus();
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
      </main>
    </div>
  );
}

export default App;