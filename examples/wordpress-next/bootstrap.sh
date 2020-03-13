#!/usr/bin/env bash

__dirname="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

main() {
	# Run `yarn install` if `node_modules` don't exist
	if ! [ -d "${__dirname}/node_modules" ]; then
		yarn install
	fi

	# Build any Docker images
	docker-compose build
}

main "$@"
