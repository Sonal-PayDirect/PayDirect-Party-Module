#!/bin/bash

# Navigate to backend directory and install dependencies
cd /home/ec2-user/app/backend-partymodel
npm install

# Navigate to frontend directory, install dependencies, and build the project
cd /home/ec2-user/app/frontend-partymodel
npm install
npm run build
