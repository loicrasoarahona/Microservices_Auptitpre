# Étape 1 : installation et compilation
FROM node:22-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Compiler TypeScript
RUN npm run build


# Étape 2 : image de production
FROM node:22-alpine AS production

WORKDIR /app

# Environnement de production
ENV NODE_ENV=production
ENV PORT=3004

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --omit=dev

# Copier le code compilé
COPY --from=builder /app/dist ./dist

# Ne pas exécuter le processus en root
RUN chown -R node:node /app
USER node

# Port utilisé par Express
EXPOSE 3004

# Lancer l'application
CMD ["node", "dist/app.js"]