import React, { useEffect } from 'react';

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Critical Resource Hints for 1000+ users
    const addResourceHints = () => {
      const head = document.head;
      
      // DNS prefetch for external domains
      const prefetchDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://pagead2.googlesyndication.com',
        'https://www.google-analytics.com',
        'https://syndication.realsrv.com'
      ];
      
      prefetchDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        head.appendChild(link);
      });
      
      // Preconnect to critical resources
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];
      
      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        head.appendChild(link);
      });
    };
    
    // Service Worker Registration for caching
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator && 'caches' in window) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('ServiceWorker registered successfully');
        } catch (error) {
          console.log('ServiceWorker registration failed:', error);
        }
      }
    };
    
    // Performance monitoring for scaling
    const monitorPerformance = () => {
      // Monitor Core Web Vitals
      if (typeof window !== 'undefined') {
        import('web-vitals').then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
          onLCP(console.log);
          onINP(console.log);
          onCLS(console.log);
          onFCP(console.log);
          onTTFB(console.log);
        });
      }
      
      // Memory usage monitoring
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        if (memInfo.usedJSHeapSize > memInfo.jsHeapSizeLimit * 0.9) {
          console.warn('High memory usage detected');
        }
      }
    };
    
    // Image optimization
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    };
    
    addResourceHints();
    registerServiceWorker();
    monitorPerformance();
    optimizeImages();
    
    // Cleanup
    return () => {
      // Cleanup observers if needed
    };
  }, []);
  
  return null;
};

export default PerformanceOptimizer;