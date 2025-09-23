# syntax=docker/dockerfile:1

############################################
# Base stage with shared tooling
############################################
FROM node:20-alpine AS base
WORKDIR /app
ENV CI=1

# Install minimal OS packages required for Node.js native deps
RUN apk add --no-cache libc6-compat

############################################
# Dependency installation
############################################
FROM base AS deps
RUN corepack enable && corepack prepare yarn@4.9.4 --activate

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN yarn install --immutable

############################################
# Application build
############################################
FROM deps AS build

# Forward build-time environment variables for Vite
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

COPY . .

RUN yarn build

############################################
# Production image
############################################
FROM nginx:1.27-alpine AS runner

# Remove default config and add SPA-friendly configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
