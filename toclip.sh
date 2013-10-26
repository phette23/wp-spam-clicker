#! /usr/bin/env bash
# copy 2nd line of bookmarklet.min.js to system clipboard
# should work on OS X & on Linux systems with the xclip package installed

if command -v xclip >/dev/null 2>&1; then
  clipboard="xclip -sel clip"
elif command -v pbcopy >/dev/null 2>&1; then
  clipboard="pbcopy"
else
  echo "I can't figure out how to pipe text to your clipboard."
  exit 1
fi

tail -n 1 bookmarklet.min.js | $clipboard
