const commonSetup = {
  repo: process.env.BITBUCKET_GIT_SSH_ORIGIN,
  path: '/var/www/react',
  user: 'ubuntu'
};

module.exports = {
  apps: [
    {
      name: 'react-renderer',
      script: 'yarn start:prod',
      log_date_format: 'YYYY-MM-DDTHH:mm:ss.SSS'
    }
  ],

  deploy: {
    develop: {
      ...commonSetup,
      host: process.env.DEVELOP_HOST,
      'post-deploy': '.deployment/hooks/post-deploy.sh develop',
      'post-setup': '.deployment/hooks/post-setup.sh develop',
      'pre-deploy-local': '.deployment/hooks/pre-deploy-local.sh develop',
      'pre-setup': '.deployment/hooks/pre-setup.sh develop',
      ref: 'origin/develop',
      env: {
        NODE_ENV: 'production'
      }
    },

    staging: {
      ...commonSetup,
      host: process.env.STAGING_HOST,
      'post-deploy': '.deployment/hooks/post-deploy.sh staging',
      'post-setup': '.deployment/hooks/post-setup.sh staging',
      'pre-deploy-local': '.deployment/hooks/pre-deploy-local.sh staging',
      'pre-setup': '.deployment/hooks/pre-setup.sh staging',
      ref: 'origin/staging',
      env: {
        NODE_ENV: 'production'
      }
    },

    production: {
      ...commonSetup,
      host: process.env.PRODUCTION_HOST,
      'post-deploy': '.deployment/hooks/post-deploy.sh production',
      'post-setup': '.deployment/hooks/post-setup.sh production',
      'pre-deploy-local': '.deployment/hooks/pre-deploy-local.sh production',
      'pre-setup': '.deployment/hooks/pre-setup.sh production',
      ref: 'origin/master',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
