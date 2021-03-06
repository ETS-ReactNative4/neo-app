# export PATH="$PATH:/Users/mac/.nvm/versions/node/v9.11.1/bin"
# ../node_modules/react-native/scripts/react-native-xcode.sh

# Sentry default build scripts (for non-nvm node installs)
# export SENTRY_PROPERTIES=sentry.properties
# export NODE_BINARY=node
# ../node_modules/@sentry/cli/bin/sentry-cli react-native xcode ../node_modules/react-native/scripts/react-native-xcode.sh

# For NVM users
# First set the path to sentry.properties
export SENTRY_PROPERTIES=sentry.properties

# Setup nvm and set node
[ -z "$NVM_DIR" ] && export NVM_DIR="$HOME/.nvm"

if [[ -s "$HOME/.nvm/nvm.sh" ]]; then
. "$HOME/.nvm/nvm.sh"
elif [[ -x "$(command -v brew)" && -s "$(brew --prefix nvm)/nvm.sh" ]]; then
. "$(brew --prefix nvm)/nvm.sh"
fi

# Set up the nodenv node version manager if present
if [[ -x "$HOME/.nodenv/bin/nodenv" ]]; then
eval "$("$HOME/.nodenv/bin/nodenv" init -)"
fi

[ -z "$NODE_BINARY" ] && export NODE_BINARY="node"

# Run sentry cli script to upload debug symbols
$NODE_BINARY ../node_modules/@sentry/cli/bin/sentry-cli upload-dsym

# OR

$NODE_BINARY ../node_modules/@sentry/cli/bin/sentry-cli react-native xcode \
../node_modules/react-native/scripts/react-native-xcode.sh
