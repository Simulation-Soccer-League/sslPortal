/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'swagger-ui-react',
    'swagger-client',
    'react-syntax-highlighter',
  ],
  env: {
    primaryDiscordUrl: 'https://discord.com/invite/zwuQMxwsbZ',
    primaryRookieDiscordUrl: 'https://discord.com/invite/zwuQMxwsbZ',
    secondaryRookieDiscordUrl: 'https://discord.com/invite/zwuQMxwsbZ',
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: ['preset-default'],
            },
            dimensions: false,
            memo: true,
            svgProps: {
              role: 'img',
            },
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
