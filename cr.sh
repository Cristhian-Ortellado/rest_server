#!/bin/bash

# Check if the script is called with an argument
if [ "$#" -eq 0 ]; then
    echo "Usage: $0 <file_name>"
    exit 1
fi

# Get the argument
file_name="$1"

# Create a file with the specified name
touch "./controllers/$file_name.controller.js"
touch "./routes/$file_name.routes.js"
touch "./models/$file_name.models.js"

echo "File '$file_name' created successfully."
