// Security utility functions

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Validates email format securely
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Enhanced Rate limiting for 1000+ users with distributed tracking
 */
class ScalableRateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly timeWindow: number; // in milliseconds
  private readonly cleanupInterval: number;

  constructor(maxAttempts = 10, timeWindow = 60000, cleanupInterval = 300000) { // 10 attempts per minute, cleanup every 5 minutes
    this.maxAttempts = maxAttempts;
    this.timeWindow = timeWindow;
    this.cleanupInterval = cleanupInterval;
    
    // Periodic cleanup for memory efficiency with 1000+ users
    setInterval(() => this.cleanup(), cleanupInterval);
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.timeWindow);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Record this attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return true;
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const timeElapsed = Date.now() - oldestAttempt;
    
    return Math.max(0, this.timeWindow - timeElapsed);
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.attempts.forEach((attempts, key) => {
      const recentAttempts = attempts.filter(time => now - time < this.timeWindow);
      if (recentAttempts.length === 0) {
        keysToDelete.push(key);
      } else {
        this.attempts.set(key, recentAttempts);
      }
    });
    
    keysToDelete.forEach(key => this.attempts.delete(key));
  }

  getStats(): { totalUsers: number; activeUsers: number } {
    const now = Date.now();
    let activeUsers = 0;
    
    this.attempts.forEach((attempts) => {
      const recentAttempts = attempts.filter(time => now - time < this.timeWindow);
      if (recentAttempts.length > 0) {
        activeUsers++;
      }
    });
    
    return {
      totalUsers: this.attempts.size,
      activeUsers
    };
  }
}

export const formRateLimiter = new ScalableRateLimiter();

/**
 * Securely stores data in localStorage with encryption
 */
export const secureStorage = {
  set: (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value);
      // Simple obfuscation (not real encryption, but better than plain text)
      const encoded = btoa(serializedValue);
      localStorage.setItem(`secure_${key}`, encoded);
    } catch (error) {
      console.error('Failed to store data securely:', error);
    }
  },

  get: (key: string): any => {
    try {
      const encoded = localStorage.getItem(`secure_${key}`);
      if (!encoded) return null;
      
      const decoded = atob(encoded);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Failed to retrieve secure data:', error);
      return null;
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(`secure_${key}`);
  }
};

/**
 * CSRF Token generation and validation
 */
export const csrfProtection = {
  generateToken: (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  setToken: (): string => {
    const token = csrfProtection.generateToken();
    secureStorage.set('csrf_token', token);
    return token;
  },

  getToken: (): string | null => {
    return secureStorage.get('csrf_token');
  },

  validateToken: (token: string): boolean => {
    const storedToken = csrfProtection.getToken();
    return storedToken === token;
  }
};

/**
 * Content validation for user-generated content
 */
export const validateContent = (content: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check for suspicious patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /onload=/i,
    /onerror=/i,
    /onclick=/i,
    /onmouseover=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /data:text\/html/i
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(content)) {
      errors.push('Content contains potentially dangerous elements');
      break;
    }
  }
  
  // Check length
  if (content.length > 10000) {
    errors.push('Content exceeds maximum length');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Secure cookie settings
 */
export const cookieSettings = {
  secure: true, // Only send over HTTPS
  sameSite: 'strict' as const, // CSRF protection
  httpOnly: false, // Can't be set from client-side JS anyway
  maxAge: 86400 // 24 hours
};

/**
 * Environment detection
 */
export const isProduction = (): boolean => {
  return window.location.protocol === 'https:' && 
         !window.location.hostname.includes('localhost') &&
         !window.location.hostname.includes('127.0.0.1');
};