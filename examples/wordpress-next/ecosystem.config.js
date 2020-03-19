const commonSetup = {
  repo: 'git@bitbucket.org:gsf-interactive/eurekamdf.com.git',
  path: '/var/www/react',
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
      'post-deploy': '.deploy-hooks/post-deploy.sh develop',
      ref: 'origin/develop',
      env: {
        NODE_ENV: 'production'
      }
    },

    staging: {
      ...commonSetup,
      host: process.env.STAGING_HOST,
      'post-deploy': '.deploy-hooks/post-deploy.sh staging',
      ref: 'origin/staging',
      env: {
        NODE_ENV: 'production'
      }
    },

    production: {
      ...commonSetup,
      host: process.env.PRODUCTION_HOST,
      'post-deploy': '.deploy-hooks/post-deploy.sh production',
      ref: 'origin/master',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
