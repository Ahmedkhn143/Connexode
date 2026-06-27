#!/bin/bash
# Connexode — Project Setup Script
# Run this INSIDE your cloned repo folder:
#   chmod +x setup.sh
#   ./setup.sh

echo "Creating Connexode directory structure..."

# App pages
mkdir -p app/about
mkdir -p app/services
mkdir -p app/contact
mkdir -p app/join/ambassador
mkdir -p app/join/internship
mkdir -p app/community/leaderboard
mkdir -p app/community/showcase
mkdir -p app/community/success-stories
mkdir -p app/verify
mkdir -p app/auth/signin
mkdir -p app/auth/signup
mkdir -p app/dashboard/student
mkdir -p app/dashboard/ambassador
mkdir -p app/admin/applications/\[id\]
mkdir -p app/admin/certificates
mkdir -p app/admin/projects
mkdir -p app/admin/stats

# API routes
mkdir -p "app/api/auth/[...nextauth]"
mkdir -p app/api/auth/register
mkdir -p app/api/applications/ambassador
mkdir -p app/api/applications/internship
mkdir -p app/api/contact
mkdir -p app/api/leaderboard
mkdir -p app/api/showcase
mkdir -p app/api/verify
mkdir -p app/api/ai-advisor
mkdir -p "app/api/admin/applications/[id]/status"
mkdir -p app/api/admin/certificates/issue
mkdir -p "app/api/admin/projects/[id]"

# Components
mkdir -p components/layout
mkdir -p components/providers
mkdir -p components/admin
mkdir -p components/dashboard

# Lib
mkdir -p lib

# Prisma
mkdir -p prisma

echo "All directories created!"
echo ""
echo "Now install dependencies:"
echo "npm install next-auth@beta bcryptjs resend @prisma/client prisma"
echo "npm install -D @types/bcryptjs"
