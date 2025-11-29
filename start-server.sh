#!/bin/bash
# Birthday Celebration App - Local Server
# This script starts a simple HTTP server to serve the app

echo "===================================="
echo "Birthday Celebration App Server"
echo "===================================="
echo ""

# Get the directory of this script
cd "$(dirname "$0")"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Using Python 3 to start the server..."
    echo ""
    echo "The app will be available at:"
    echo "- Local: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Using Python to start the server..."
    echo ""
    echo "The app will be available at:"
    echo "- Local: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
elif command -v node &> /dev/null; then
    echo "Using Node.js to start the server..."
    echo "Please run: npx http-server"
else
    echo "Neither Python nor Node.js found."
    echo "You can still open index.html directly in your browser!"
fi
