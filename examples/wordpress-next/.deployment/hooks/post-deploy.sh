#!/usr/bin/env bash
set -eu -o pipefail

main() {
	local environment="$1"

	# production=false ensures we install tools necessary for building the application
	yarn install --production=false
	yarn build
	pm2 startOrReload ecosystem.config.js --env "$environment"
	pm2 save
}

main "$@"
