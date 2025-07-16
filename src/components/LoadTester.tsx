import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';

interface TestResult {
  endpoint: string;
  success: number;
  errors: number;
  responses: any[];
  errorMessages: string[];
  avgResponseTime: number;
}

interface LoadTestResults {
  newsletter: TestResult;
  contact: TestResult;
  analytics: TestResult;
}

export const LoadTester = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<LoadTestResults | null>(null);

  const generateRandomEmail = () => `test${Math.random().toString(36).substring(7)}@example.com`;
  const generateRandomName = () => `User${Math.random().toString(36).substring(7)}`;

  const testNewsletterEndpoint = async (userCount: number): Promise<TestResult> => {
    const results: TestResult = {
      endpoint: 'Newsletter Subscription',
      success: 0,
      errors: 0,
      responses: [],
      errorMessages: [],
      avgResponseTime: 0
    };

    const promises = Array.from({ length: userCount }, async () => {
      const start = Date.now();
      try {
        const { data, error } = await supabase
          .from('newsletter_subscriptions')
          .insert({
            email: generateRandomEmail(),
            name: generateRandomName(),
            source: 'load_test'
          });

        const responseTime = Date.now() - start;
        
        if (error) {
          results.errors++;
          results.errorMessages.push(error.message);
        } else {
          results.success++;
          results.responses.push(data);
        }
        
        return responseTime;
      } catch (err: any) {
        results.errors++;
        results.errorMessages.push(err.message);
        return Date.now() - start;
      }
    });

    const responseTimes = await Promise.all(promises);
    results.avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    
    return results;
  };

  const testContactEndpoint = async (userCount: number): Promise<TestResult> => {
    const results: TestResult = {
      endpoint: 'Contact Form',
      success: 0,
      errors: 0,
      responses: [],
      errorMessages: [],
      avgResponseTime: 0
    };

    const promises = Array.from({ length: userCount }, async () => {
      const start = Date.now();
      try {
        const response = await supabase.functions.invoke('send-contact-email', {
          body: {
            name: generateRandomName(),
            email: generateRandomEmail(),
            subject: 'Load Test Message',
            message: 'This is a load test message'
          }
        });

        const responseTime = Date.now() - start;
        
        if (response.error) {
          results.errors++;
          results.errorMessages.push(response.error.message);
        } else {
          results.success++;
          results.responses.push(response.data);
        }
        
        return responseTime;
      } catch (err: any) {
        results.errors++;
        results.errorMessages.push(err.message);
        return Date.now() - start;
      }
    });

    const responseTimes = await Promise.all(promises);
    results.avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    
    return results;
  };

  const testAnalyticsEndpoint = async (userCount: number): Promise<TestResult> => {
    const results: TestResult = {
      endpoint: 'Analytics Tracking',
      success: 0,
      errors: 0,
      responses: [],
      errorMessages: [],
      avgResponseTime: 0
    };

    const promises = Array.from({ length: userCount }, async () => {
      const start = Date.now();
      try {
        const { data, error } = await supabase
          .from('user_analytics')
          .insert({
            session_id: crypto.randomUUID(),
            event_type: 'load_test',
            event_data: { test: true, timestamp: Date.now() },
            user_agent: navigator.userAgent
          });

        const responseTime = Date.now() - start;
        
        if (error) {
          results.errors++;
          results.errorMessages.push(error.message);
        } else {
          results.success++;
          results.responses.push(data);
        }
        
        return responseTime;
      } catch (err: any) {
        results.errors++;
        results.errorMessages.push(err.message);
        return Date.now() - start;
      }
    });

    const responseTimes = await Promise.all(promises);
    results.avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    
    return results;
  };

  const runLoadTest = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);

    console.log('🚀 Starting load test with 1000 concurrent users...');

    try {
      // Test newsletter endpoint (333 users)
      setProgress(10);
      console.log('📧 Testing newsletter subscription endpoint...');
      const newsletterResults = await testNewsletterEndpoint(333);
      console.log('Newsletter results:', newsletterResults);

      // Test contact endpoint (333 users) 
      setProgress(40);
      console.log('📞 Testing contact form endpoint...');
      const contactResults = await testContactEndpoint(333);
      console.log('Contact results:', contactResults);

      // Test analytics endpoint (334 users)
      setProgress(70);
      console.log('📊 Testing analytics tracking endpoint...');
      const analyticsResults = await testAnalyticsEndpoint(334);
      console.log('Analytics results:', analyticsResults);

      setProgress(100);

      const finalResults: LoadTestResults = {
        newsletter: newsletterResults,
        contact: contactResults,
        analytics: analyticsResults
      };

      setResults(finalResults);
      console.log('✅ Load test completed!', finalResults);

    } catch (error) {
      console.error('❌ Load test failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            🧪 Load Testing Dashboard
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Simulate 1000 concurrent users hitting backend endpoints
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={runLoadTest} 
            disabled={isRunning}
            className="w-full"
            size="lg"
          >
            {isRunning ? 'Running Load Test...' : 'Start Load Test (1000 Users)'}
          </Button>
          
          {isRunning && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                Progress: {progress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(results).map(([key, result]) => (
            <Card key={key} className="space-y-4">
              <CardHeader>
                <CardTitle className="text-lg">{result.endpoint}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-green-600">
                    ✅ Success: {result.success}
                  </div>
                  <div className="text-red-600">
                    ❌ Errors: {result.errors}
                  </div>
                  <div className="col-span-2 text-blue-600">
                    ⏱️ Avg Response: {result.avgResponseTime.toFixed(2)}ms
                  </div>
                </div>
                
                {result.errorMessages.length > 0 && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-red-600 font-medium">
                      Error Messages ({result.errorMessages.length})
                    </summary>
                    <div className="mt-2 p-2 bg-red-50 rounded text-xs max-h-32 overflow-y-auto">
                      {[...new Set(result.errorMessages)].map((error, idx) => (
                        <div key={idx} className="mb-1">{String(error)}</div>
                      ))}
                    </div>
                  </details>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>📊 Console Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Check the browser console (F12) for detailed logs of all requests, responses, and errors.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};