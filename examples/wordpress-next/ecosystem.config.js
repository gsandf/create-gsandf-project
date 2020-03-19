const commonSetup = {
  repo: 'git@bitbucket.org:gsf-interactive/eurekamdf.com.git',
  path: '/var/www/react',
  'post-deploy': '.deploy-hooks/post-deploy.sh',
  user: 'ubuntu'
};

module.exports = {
  apps: [
    {
      name: 'react-renderer',
      script: 'yarn start:prod'
    }
  ],

  deploy: {
    develop: {
      ...commonSetup,
      host: process.env.DEVELOP_HOST,
      ref: 'origin/develop',
      env: {
        NODE_ENV: 'production'
      }
    },

    staging: {
      ...commonSetup,
      host: process.env.STAGING_HOST,
      ref: 'origin/staging',
      env: {
        NODE_ENV: 'production'
      }
    },

    production: {
      ...commonSetup,
      host: process.env.PRODUCTION_HOST,
      ref: 'origin/master',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
