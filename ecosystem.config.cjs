module.exports = {
  apps: [
    {
      name: "app-data-node",
      script:
        process.env.NODE_ENV === "development"
          ? "src/index.ts"
          : "dist/index.js",
      interpreter: process.env.NODE_ENV === "development" ? "npx tsx" : "node",
      watch: process.env.NODE_ENV === "development",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
