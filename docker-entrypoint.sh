#!/bin/sh

# Ensure Prisma generate and migrate commands use the correct schema path
echo "🔧 Running Prisma generate..."
npx prisma generate --schema=./prisma/schema.prisma

echo "🧬 Running Prisma migrate deploy..."
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Now start the app (Next.js)
echo "🚀 Starting Next.js with App Router..."
exec "$@"
