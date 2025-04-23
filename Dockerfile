# 1. Use the official Node.js image as the base
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json (or yarn.lock) for installing dependencies
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy all the source code, including prisma/ folder
COPY . .

# 6. Make sure prisma folder is copied if it's not already
COPY prisma ./prisma

# 7. Set entry point for Prisma generate and migrate
ENTRYPOINT ["sh", "/app/docker-entrypoint.sh"]

# 8. Expose port (if needed)
EXPOSE 3000

# 9. Run Next.js app
CMD ["npm", "run", "dev"]
