/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['partnersimages.s3.amazonaws.com']
  },
  env: {
    BASE_URL_API: 'http://193.203.183.136:3333'
  },
}

module.exports = nextConfig
