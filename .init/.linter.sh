#!/bin/bash
cd /home/kavia/workspace/code-generation/containerized-architecture-demo-5687-5698/app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

