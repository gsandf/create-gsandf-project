#!/usr/bin/env bash
set -eu -o pipefail

##
# Runs on the server after successfully pulling the latest code.
# Use this script to start the project and save any configuration changes.
##

main() {
	local environment="$1"

	# production=false ensures we install tools necessary for building the application
	yarn install --production=false --prefer-offline
	yarn build
	pm2 startOrReload ecosystem.config.js --env "$environment"
	pm2 save

	# Reload using the latest Nginx config
	sudo nginx -t && sudo service nginx reload
}

main "$@"
