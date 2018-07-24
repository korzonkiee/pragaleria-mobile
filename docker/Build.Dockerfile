FROM korzonkiee/mobile-react-native:10-27 AS build-env

ARG VERSION_CODE
ENV VERSION_CODE=${VERSION_CODE}

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY android/gradle android/gradle
COPY android/gradlew android/gradlew

# Cache Gradle binaries
WORKDIR /app/android
RUN ./gradlew --version

WORKDIR /app

# Restore
RUN yarn install

COPY . .

# Run tests
RUN yarn test

WORKDIR /app/android
RUN ./gradlew assembleEnvTestStaging

# Copy to release image with only the images
FROM alpine

RUN apk add --no-cache curl

WORKDIR /app
COPY --from=build-env /app/android/app/build/outputs/apk/envTest/staging/app-envTest-staging.apk ./envTest-staging.apk
