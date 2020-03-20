#!/usr/bin/env bash
set -eu -o pipefail

##
# Runs on the locally on the machine used to start a deployment.
# Use this script if any work needs to be done before deploying the project.
##

main() {
	echo 'Skipping pre-deploy-local hook...'
}

main "$@"
