#!/usr/bin/env bash
set -eu -o pipefail

##
# Runs on the server after setting up the project repository.
# Use this script to set up any server dependencies the project needs to run.
##

main() {
	echo 'Skipping post-setup hook...'
}

main "$@"
