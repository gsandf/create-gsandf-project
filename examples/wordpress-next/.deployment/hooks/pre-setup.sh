#!/usr/bin/env bash
set -eu -o pipefail

##
# Runs on the server before setting up the project repository.
# Use this script to ensure the project can be setup properly.
##

NODEJS_MAJOR_VERSION='12'
YARN_MAJOR_VERSION='1'

isInstalled() {
	hash "$@" 2>/dev/null
}

heading() {
	bold='\e[1m'
	underline='\e[4m'
	reset='\e[0m'
	printf '%b%s%b\n' "${bold}${underline}" "$@" "$reset"
}

setupDirectories() {
	sudo mkdir -p /var/www/react
	sudo chown ubuntu:www-data /var/www/react
}

setupNginx() {
	if isInstalled nginx; then
		echo '✔︎ Nginx already installed'
		return
	fi
	sudo apt-get install -y nginx
	echo '✔︎ Installed Nginx'
}

setupNodejs() {
	currentNodeVersion='none'
	currentYarnVersion='none'

	# Check version of Node.js and Yarn
	if isInstalled node; then
		currentNodeVersion="$(node --version | grep -Eo 'v[0-9]+' | tr -d 'v')"
	fi

	if isInstalled yarn; then
		currentYarnVersion="$(yarn --version | grep -Eo '^[0-9]+')"
	fi

	# Install Node.js if not the correct version
	if [[ $currentNodeVersion != "$NODEJS_MAJOR_VERSION" ]]; then
		printf 'Current Node.js version is: %s\n' "$(node --version)"
		printf 'Installing latest v%s\n' "$NODEJS_MAJOR_VERSION"

		(curl -sL "https://deb.nodesource.com/setup_${NODEJS_MAJOR_VERSION}.x" | sudo -E bash -) && sudo apt-get install -y nodejs
		echo '✔︎ Node.js installed'
	else
		echo '✔︎ Already has a compatible version of Node.js'
	fi

	# Install Yarn if not the correct version
	if [[ $currentYarnVersion != "$YARN_MAJOR_VERSION" ]]; then
		printf 'Current Yarn version is: %s\n' "$(yarn --version)"
		printf 'Installing latest v%s\n' "$YARN_MAJOR_VERSION"

		curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
		echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
		sudo apt update
		sudo apt-get install -y yarn
		echo '✔︎ Yarn installed'
	else
		echo '✔︎ Already has a compatible version of Yarn'
	fi
}

setupWpCli() {
	if isInstalled wp; then
		echo '✔︎ wp-cli already installed'
		return
	fi

	curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
	chmod +x wp-cli.phar
	sudo mv wp-cli.phar /usr/local/bin/wp

	printf '✔︎ Installed %s' "$(wp cli version)"
}

main() {
	heading 'Ensuring Node.js is installed'
	setupNodejs

	heading 'Ensuring Nginx is installed'
	setupNginx

	heading 'Ensuring WP-CLI is installed'
	setupWpCli

	heading 'Ensuring directory exists'
	setupDirectories
}

main "$@"
