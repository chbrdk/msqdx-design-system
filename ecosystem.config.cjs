/**
 * PM2 ecosystem config – Storybook für msqdx-design-system
 * Start: pm2 start ecosystem.config.cjs
 * Stop:  pm2 stop storybook
 * Logs:  pm2 logs storybook
 */
module.exports = {
  apps: [
    {
      name: "storybook",
      cwd: "packages/react",
      script: "npm",
      args: "run storybook",
      interpreter: "none",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
