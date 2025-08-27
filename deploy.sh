#!/bin/bash

# FredRAMP.com Deployment Script
# This script helps deploy the parody site to web hosting

echo "🚀 FredRAMP.com Deployment Script"
echo "=================================="
echo ""

# Check if required files exist
echo "📁 Checking project files..."
required_files=("index.html" "styles.css" "script.js" "FredRampLogo.png" "FredlandFlag.png" "mountain_abstract.svg" "gsa-star-mark-whtlogo.svg" "custom-linkedin-icon.svg" "uswds/img/sprite.svg")

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
        exit 1
    fi
done

echo ""
echo "✅ All required files found!"
echo ""

# Create deployment package
echo "📦 Creating deployment package..."
if [ -d "deploy" ]; then
    rm -rf deploy
fi

mkdir deploy
cp -r * deploy/
cd deploy

# Remove development files
rm -f deploy.sh
rm -f README.md

echo "✅ Deployment package created in 'deploy/' directory"
echo ""

# Show deployment instructions
echo "🌐 Deployment Instructions:"
echo "============================"
echo ""
echo "1. Upload all files from the 'deploy/' directory to your web hosting"
echo "2. Ensure your domain 'fredramp.com' points to your hosting"
echo "3. The site should work immediately - no server-side requirements"
echo ""
echo "📁 Files to upload:"
ls -la
echo ""
echo "🎉 Your FredRAMP parody site is ready to deploy!"
echo ""
echo "⚠️  Remember: This is a parody site for entertainment purposes only!"
echo "   It is NOT affiliated with any government entity."
