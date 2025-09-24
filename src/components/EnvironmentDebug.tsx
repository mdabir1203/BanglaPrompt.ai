import React, { useEffect, useState } from 'react';

interface EnvironmentDebugProps {
  showInProduction?: boolean;
}

const EnvironmentDebug: React.FC<EnvironmentDebugProps> = ({ 
  showInProduction = false 
}) => {
  const [envInfo, setEnvInfo] = useState<Record<string, unknown>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or if explicitly enabled
    const shouldShow = import.meta.env.DEV || showInProduction;
    if (!shouldShow) return;

    const checkEnvironment = () => {
      const info: Record<string, unknown> = {};

      // Check browser injected env
      try {
        const browserEnv = (globalThis as { __ENV__?: Record<string, unknown> }).__ENV__;
        info.browserEnv = browserEnv ? Object.keys(browserEnv) : 'Not available';
        info.supabaseUrl = browserEnv?.SUPABASE_URL ? 'Available' : 'Missing';
        info.supabaseKey = browserEnv?.SUPABASE_ANON_KEY ? 'Available' : 'Missing';
      } catch (error) {
        info.browserEnvError = String(error);
      }

      // Check import.meta.env
      try {
        const importMetaEnv = import.meta.env;
        info.importMetaEnv = Object.keys(importMetaEnv);
        info.supabaseUrlImportMeta = importMetaEnv.SUPABASE_URL ? 'Available' : 'Missing';
        info.supabaseKeyImportMeta = importMetaEnv.SUPABASE_ANON_KEY ? 'Available' : 'Missing';
      } catch (error) {
        info.importMetaEnvError = String(error);
      }

      // Check localStorage
      try {
        info.localStorageAvailable = typeof localStorage !== 'undefined';
      } catch (error) {
        info.localStorageError = String(error);
      }

      setEnvInfo(info);
    };

    checkEnvironment();
  }, [showInProduction]);

  // Don't render in production unless explicitly enabled
  if (!import.meta.env.DEV && !showInProduction) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-md z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Environment Debug</h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-blue-400 hover:text-blue-300"
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {isVisible && (
        <div className="space-y-2">
          {Object.entries(envInfo).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-300">{key}:</span>
              <span className="text-green-400">
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnvironmentDebug;
