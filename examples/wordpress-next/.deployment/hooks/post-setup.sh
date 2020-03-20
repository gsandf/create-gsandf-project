#!/usr/bin/env bash
set -eu -o pipefail

##
# Runs on the server after setting up the project repository.
# Use this script to set up anything after the repository has been cloned that
# doesn't need to run on every deployment.
##

main() {
	echo 'Skipping post-setup hook...'
}

main "$@"
