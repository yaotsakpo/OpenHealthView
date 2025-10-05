// AWS Lambda handler for scheduled data updates
const dataUpdateService = require('./data-services/dataUpdateService');

exports.handler = async (event, context) => {
    console.log('🔄 Starting scheduled data update...');
    console.log('Event source:', event.source || 'EventBridge');
    
    try {
        // Update all rural healthcare data
        const results = await dataUpdateService.updateAllData();
        
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Scheduled data update completed successfully',
                timestamp: new Date().toISOString(),
                results: results,
                source: 'aws-scheduled'
            })
        };
        
        console.log('✅ Scheduled update completed:', results);
        return response;
        
    } catch (error) {
        console.error('❌ Scheduled update failed:', error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
                source: 'aws-scheduled'
            })
        };
    }
};