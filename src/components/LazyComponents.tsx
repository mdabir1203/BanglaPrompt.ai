// Lazy loading components for code splitting
import { lazy } from 'react';

// Lazy load heavy components to reduce initial bundle size
export const LazyAdvancedPatterns = lazy(() => import('./AdvancedPatterns'));
export const LazyPromptTemplates = lazy(() => import('./PromptTemplates'));
export const LazyContact = lazy(() => import('./Contact'));
export const LazyAbout = lazy(() => import('./About'));

// Lazy load popup components
export const LazyMediumSubscriptionPopup = lazy(() => import('./MediumSubscriptionPopup'));
export const LazyNewsletterConversionPopup = lazy(() => import('./NewsletterConversionPopup'));

// Preload components that are likely to be used
export const preloadComponents = () => {
  // Preload components after initial load
  setTimeout(() => {
    import('./AdvancedPatterns');
    import('./PromptTemplates');
  }, 2000);
  
  // Preload contact form on user interaction
  const preloadContact = () => {
    import('./Contact');
    document.removeEventListener('mouseover', preloadContact);
    document.removeEventListener('touchstart', preloadContact);
  };
  
  document.addEventListener('mouseover', preloadContact, { once: true });
  document.addEventListener('touchstart', preloadContact, { once: true });
};