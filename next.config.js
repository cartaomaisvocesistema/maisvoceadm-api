/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['partnersimages.s3.amazonaws.com']
  }
}

module.exports = nextConfig
