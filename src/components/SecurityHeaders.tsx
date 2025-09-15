import React from 'react';
import { Helmet } from 'react-helmet-async';

const SecurityHeaders: React.FC = () => {
  return (
    <Helmet>
      {/* Content Security Policy - Prevents XSS attacks */}
      <meta 
        httpEquiv="Content-Security-Policy" 
        content={`
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' 'nonce-google-adsense'
            https://pagead2.googlesyndication.com
            https://www.googletagmanager.com
            https://www.google-analytics.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://syndication.realsrv.com
            https://inklinkor.com
            https://www.topcreativeformat.com
            https://cdn.gpteng.co
            https://www.clarity.ms;
          style-src 'self' 'unsafe-inline' 
            https://fonts.googleapis.com;
          font-src 'self' 
            https://fonts.gstatic.com 
            https://fonts.googleapis.com;
          img-src 'self' data: blob:
            https://pagead2.googlesyndication.com
            https://www.google-analytics.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://syndication.realsrv.com;
          connect-src 'self'
            https://pagead2.googlesyndication.com
            https://www.google-analytics.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://syndication.realsrv.com
            https://medium.com
            https://api.medium.com;
          frame-src 'self'
            https://pagead2.googlesyndication.com
            https://googleads.g.doubleclick.net
            https://tpc.googlesyndication.com
            https://adservice.google.com
            https://syndication.realsrv.com;
          object-src 'none';
          base-uri 'self';
          form-action 'self' https://medium.com;
          upgrade-insecure-requests;
        `.replace(/\s+/g, ' ').trim()}
      />
      
      {/* Prevent XSS attacks */}
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Prevent content type sniffing */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      
      {/* Prevent clickjacking */}
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      
      {/* Referrer Policy - Controls referrer information */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Permissions Policy - Controls browser features */}
      <meta 
        httpEquiv="Permissions-Policy" 
        content="accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()" 
      />
      
      {/* HSTS - Force HTTPS (only works on HTTPS) */}
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
      
      {/* Cross-Origin Policies */}
      <meta httpEquiv="Cross-Origin-Embedder-Policy" content="unsafe-none" />
      <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups" />
      <meta httpEquiv="Cross-Origin-Resource-Policy" content="cross-origin" />
    </Helmet>
  );
};

export default SecurityHeaders;
