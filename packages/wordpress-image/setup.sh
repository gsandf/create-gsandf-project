#!/usr/bin/env bash
set -eu -o pipefail

pluginsFile='/wp/wp-plugins.txt'

printHeading() {
	bold='\e[1m'
	underline='\e[4m'
	reset='\e[0m'
	printf '%b%s%b\n' "${bold}${underline}" "$@" "$reset"
}

setupConfig() {
	wp core config \
		--dbhost="${MYSQL_HOST:-db}:${MYSQL_PORT:-3306}" \
		--dbuser="${MYSQL_USER:-root}" \
		--dbpass="${MYSQL_PASSWORD:-root}" \
		--dbname="${MYSQL_DATABASE:-wp}" \
		--skip-check
}

installWordPress() {
	wp core install \
		--url="${WORDPRESS_URL:-localhost}" \
		--title="${WORDPRESS_TITLE:-WordPress site}" \
		--admin_user="${WORDPRESS_ADMIN_USER:-admin}" \
		--admin_password="${WORDPRESS_ADMIN_PASSWORD:-admin}" \
		--admin_email="${WORDPRESS_ADMIN_MAIL:-admin@example.com}"

	wp option update permalink_structure '/%postname%/'
}

installPlugins() {
	while read -r line; do
		# Ignore lines starting with a comment
		[[ $line =~ ^# ]] && continue
		# Ignore empty lines
		[[ $line == '' ]] && continue

		IFS='@' read -r pluginName pluginVersion <<<"${line}"
		echo "wp plugin install --activate --version=${pluginVersion} ${pluginName}"
		wp plugin install --activate --version="${pluginVersion}" "${pluginName}"
	done <"$pluginsFile"
}

main() {
	# Create the files needed to connect to the database
	if wp config has DB_NAME; then
		printHeading '✔︎ Using existing config'
	else
		printHeading 'Setting up config'
		setupConfig
	fi

	# Wait for the database to be ready
	printHeading 'Waiting on database'
	dockerize -wait "tcp://${MYSQL_HOST:-db}:${MYSQL_PORT:-3306}" -timeout 30s

	# Install base WordPress files
	if wp core is-installed; then
		printHeading '✔︎ Using existing WordPress install'
	else
		printHeading 'Installing WordPress'
		installWordPress
	fi

	# Install WordPress plugins
	printHeading 'Installing plugins'
	installPlugins

	# Activate the custom theme
	if wp theme is-active custom-theme; then
		printHeading '✔︎ Using custom theme'
	else
		printHeading 'Activating custom theme'
		wp theme activate custom-theme
	fi

	# Start a basic PHP server
	printHeading 'Starting server at http://localhost:8080'
	wp server --host=0.0.0.0:8080
}

main "$@"
