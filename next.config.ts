import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: []
});

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  images: {
    domains: ['conectapro.app', 'www.conectapro.app'],
    formats: ['image/webp', 'image/avif'],
  },
  // Configurações para aceitar requisições maiores
  serverExternalPackages: [],
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
  // Ignorar pasta de testes no build
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Ignorar arquivos de teste no build
    config.module.rules.push({
      test: /teste-calculadora\/.*\.(ts|tsx|js|jsx)$/,
      loader: 'ignore-loader'
    });
    
    return config;
  },
  
  // Excluir pasta teste-calculadora do build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].map(ext => 
    `!teste-calculadora/**/*.${ext}`
  ).concat(['tsx', 'ts', 'jsx', 'js']),
  
  eslint: {
    // Ignorar arquivos de teste no linting
    ignoreDuringBuilds: false,
    dirs: ['src'] // Apenas lint na pasta src
  },
  
  typescript: {
    // Ignorar erros de TypeScript apenas nos arquivos de teste
    ignoreBuildErrors: false,
  },
};

export default withPWA(nextConfig);
