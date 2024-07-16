#/bin/bash

deno task lint $1 &&
deno task fmt $1 &&
deno task validate $1/mod.js &&
deno task bundle $1/mod.js
