#!/usr/bin/env bash
set -eu -o pipefail

##
# Runs on the server after setting up the project repository.
# Use this script to set up anything after the repository has been cloned that
# doesn't need to run on every deployment.
##

# The directory of the currently running file
declare -r __dirname="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source "${__dirname}/../../.env"

repoLocation='/var/www/react/current'

heading() {
	bold='\e[1m'
	underline='\e[4m'
	reset='\e[0m'
	printf '%b%s%b\n' "${bold}${underline}" "$@" "$reset"
}

isInstalled() {
	hash "$@" 2>/dev/null
}

installWordPress() {
	wpVersion=${WORDPRESS_VERSION:-latest}

	echo "… installing WordPress (version ${wpVersion})"

	wp core download --skip-content --version="${wpVersion}"

	wp config create \
		--dbhost="${MYSQL_HOST:-db}:${MYSQL_PORT:-3306}" \
		--dbname="${MYSQL_DATABASE}" \
		--dbpass="${MYSQL_PASSWORD}" \
		--dbuser="${MYSQL_USER:-root}"

	wp core install \
		--admin_email="${WORDPRESS_ADMIN_MAIL:-sysops@gsandf.com}" \
		--admin_password="${WORDPRESS_ADMIN_PASSWORD}" \
		--admin_user="${WORDPRESS_ADMIN_USER:-gsandf}" \
		--title="${WORDPRESS_TITLE:-WordPress site}" \
		--url="${WORDPRESS_URL:-localhost}"

	wp option update permalink_structure '/posts/%postname%/'

	echo "✔︎ Installed WordPress ${wpVersion}"
}

setupDirectories() {
	sudo mkdir -p "$WORDPRESS_PATH"
	sudo chown ubuntu:www-data "$WORDPRESS_PATH"
}

setupNginxConfig() {
	local sourcePath="${repoLocation}/.deployment/wordpress-react.conf"
	local destinationPath="/etc/nginx/sites-enabled/wordpress-react.conf"

	if [ ! -f "$destinationPath" ]; then
		echo '… adding symlink to Nginx configuration'
		sudo ln -s "$sourcePath" "$destinationPath"
	fi

	sudo nginx -t
	sudo service nginx reload

	if [ -f /etc/nginx/sites-enabled/default ]; then
		echo '⚠︎ The default Nginx file still exists. It is likely you should remove it.'
	fi

	echo '✔︎ Nginx config file setup'
}

setupPHP() {
	if isInstalled php; then
		echo '✔︎ PHP already installed'
		return
	fi

	echo "… installing PHP and extensions"
	sudo apt-get install -y \
		php-curl \
		php-fpm \
		php-gd \
		php-intl \
		php-mbstring \
		php-mysql \
		php-soap \
		php-xml \
		php-xmlrpc \
		php-zip \
		php7.2-opcache \
		libmagickwand-dev \
		mysql-client
}

setupPM2() {
	if ! isInstalled pm2; then
		sudo npm i -g pm2

		echo '… setting up pm2-logrotate'

		pm2 install pm2-logrotate
		pm2 set pm2-logrotate:compress true
		pm2 set pm2-logrotate:retain 30
		pm2 set pm2-logrotate:max_size 10M
	fi

	echo '✔︎ pm2 installed'
}

setupWordPress() {
	# Install base WordPress files
	if wp core is-installed; then
		echo '✔︎ WordPress already installed'
	else
		installWordPress
	fi

	# Symlink custom theme
	themesDirectory="${WORDPRESS_PATH}/wp-content/themes"

	if [ -d "$themesDirectory" ]; then
		echo '✔︎ themes folder already created'
	else
		echo "… creating wp-content/themes"
		mkdir -p "$themesDirectory"
	fi

	customThemeDirectory="${themesDirectory}/${WORDPRESS_THEME}"

	if [ -d "$customThemeDirectory" ]; then
		echo '✔︎ custom theme in correct location'
	else
		echo "… adding symlink to WordPress theme"
		ln -s "${repoLocation}/packages/wordpress-theme" "$customThemeDirectory"
	fi

	# Activate the custom theme
	if wp theme is-active "$WORDPRESS_THEME"; then
		echo '✔︎ Using custom theme'
	else
		echo '… activating custom theme'
		wp theme activate "$WORDPRESS_THEME"
	fi

	# Install WordPress plugins
	echo '… installing plugins'
	wp plugin-list restore "$WORDPRESS_PLUGIN_FILE"
}

main() {
	local environment="$1"

	set -a
	source <(node "${__dirname}/../get-env.js" "$environment")
	set +a

	heading 'Setting up PHP'
	setupPHP

	heading 'Setting up WordPress'
	setupDirectories
	pushd "$WORDPRESS_PATH"
	setupWordPress
	popd

	heading 'Setting up Nginx config'
	setupNginxConfig

	heading 'Setting up PM2'
	setupPM2

	heading 'ALMOST DONE'
	echo '================================================================================='
	echo 'To ensure everything restarts if the server goes down, run this command manually:'
	echo "$(pm2 startup) && pm2 save" | tail -n1
	echo '================================================================================='
}

main "$@"
