#!/usr/bin/env bash
set -eu -o pipefail

##
# Runs on the server before setting up the project repository.
# Use this script to ensure the project can be setup properly.
##

main() {
	echo 'Skipping pre-setup hook...'
}

main "$@"
