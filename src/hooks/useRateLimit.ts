import { useState, useCallback, useRef } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  timeWindow: number; // in milliseconds
  identifier?: string;
}

interface RateLimitState {
  isAllowed: boolean;
  remainingAttempts: number;
  resetTime: number;
}

export const useRateLimit = (config: RateLimitConfig) => {
  const { maxAttempts, timeWindow, identifier = 'default' } = config;
  const attemptsRef = useRef<Map<string, number[]>>(new Map());
  
  const [state, setState] = useState<RateLimitState>({
    isAllowed: true,
    remainingAttempts: maxAttempts,
    resetTime: 0
  });

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const key = identifier;
    const attempts = attemptsRef.current.get(key) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < timeWindow);
    
    if (recentAttempts.length >= maxAttempts) {
      const oldestAttempt = Math.min(...recentAttempts);
      const resetTime = oldestAttempt + timeWindow;
      
      setState({
        isAllowed: false,
        remainingAttempts: 0,
        resetTime
      });
      
      return false;
    }
    
    // Record this attempt
    recentAttempts.push(now);
    attemptsRef.current.set(key, recentAttempts);
    
    setState({
      isAllowed: true,
      remainingAttempts: maxAttempts - recentAttempts.length,
      resetTime: 0
    });
    
    return true;
  }, [maxAttempts, timeWindow, identifier]);

  const reset = useCallback(() => {
    attemptsRef.current.delete(identifier);
    setState({
      isAllowed: true,
      remainingAttempts: maxAttempts,
      resetTime: 0
    });
  }, [identifier, maxAttempts]);

  return {
    ...state,
    checkRateLimit,
    reset
  };
};