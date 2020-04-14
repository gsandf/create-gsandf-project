#!/usr/bin/env bash
set -eu -o pipefail

##
# Runs on the server after successfully pulling the latest code.
# Use this script to start the project and save any configuration changes.
##

# The directory of the currently running file
declare -r __dirname="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source "${__dirname}/../../.env"

# NOTE: if environments need different plugins for some reason, multiple plugin
# files can be used
pluginsFile="/var/www/react/current/plugins.json"

printHeading() {
	bold='\e[1m'
	underline='\e[4m'
	reset='\e[0m'
	printf '%b%s%b\n' "${bold}${underline}" "$@" "$reset"
}

updateWordPressPlugins() {
	pushd "$WORDPRESS_PATH"
	wp plugin-list restore $pluginsFile
	popd
}

main() {
	local environment="$1"

	# Install dependencies, build the project, and restart the front-end server
	printHeading 'Updating Next.js project…'
	# production=false ensures we install tools necessary for building the application
	yarn install --production=false --prefer-offline
	yarn build
	pm2 startOrReload ecosystem.config.js --env "$environment"
	pm2 save

	# Forces plugins to match those found in the $pluginsFile
	printHeading 'Updating WordPress Plugins…'
	updateWordPressPlugins

	# Reload using the latest Nginx config
	printHeading 'Reloading Nginx…'
	sudo nginx -t && sudo service nginx reload
}

main "$@"
