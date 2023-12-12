/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['partnersimages.s3.amazonaws.com']
  },
  env: {
    BASE_URL_API: 'http://localhost:3333'
  },
}

module.exports = nextConfig
