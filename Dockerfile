# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Production stage 
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config 
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]