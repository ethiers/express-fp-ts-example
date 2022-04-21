# Functional programming in Typescript with fp-ts

by Héctor Valls

url: https://hvalls.dev/posts/intro-functional-fpts

# Installation

``
npm install
``

#### Run

``
npm start
``

#### debug

``
npm run debug
``

# Debug with Webstorm

there are three options :

#### 1 - Configuration:

Run/Debug Configurations > add Node.js

Name: ts-node<br>
Node parameters: --experimental-modules --es-module-specifier-resolution=node --loader ts-node/esm<br>
Working dir: project_folder<br>
Javascript file: src\server.ts<br>

#### 2 - Configuration:

Run/Debug Configurations > add npm

Name: nodemon-npm-debug<br>
package.json: project_folder/package.json<br>
Script: debug<br>
Package manager: path/to/npm (if volta: ~\AppData\Local\Volta\tools\image\node\16.13.1\node_modules\npm)

#### 3 - Configuration:

Run this command
``
npm run start:inspect
``

and Run/Debug Configurations > add Attach to Node.js/Chrome

Name: localhost
Host: localhost<br>
Port: 9229
Attach to: Chrome or Node.js > 6.3 with --inpect
