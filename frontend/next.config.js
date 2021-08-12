module.exports = {
  env: {
    CMSDOMAIN: "http://localhost:1337",
  },
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
};

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};
