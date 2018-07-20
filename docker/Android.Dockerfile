# Setup the container with the appropriate operating system and JDK 8.0.
FROM openjdk:8-jdk

# Configure Android SDK (https://developer.android.com/studio/#downloads).
ARG SDK_URL=https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
ARG SDK_SHA=92ffee5a1d98d856634e8b71132e8a95d96c83a63fde1099be3d86df3106def9
ARG ANDROID_VERSION
ARG ANDROID_BUILD_TOOLS_VERSION

ARG TEST_KEYSTORE_KEY_ALIAS=test
ARG TEST_KEYSTORE_SOURCE_FILE
ARG TEST_KEYSTORE_PASSWORD

# ENV vs ARG
# ENV values are available during the image build phase, but also after a container is launched from the image.
# A running container won’t have access to an ARG variable value.

# I think it is not neccessary. We don't need SDK_URL and SDK_SHA during runtime.
ENV SDK_URL=${SDK_URL}
ENV SDK_SHA=${SDK_SHA}

ENV ANDROID_HOME="/opt/android-sdk"
ENV ANDROID_VERSION=${ANDROID_VERSION}
ENV ANDROID_BUILD_TOOLS_VERSION=${ANDROID_BUILD_TOOLS_VERSION}

ENV TEST_KEYSTORE_LOCATION=${ANDROID_HOME}/test.keystore
ENV TEST_KEYSTORE_PASSWORD=${TEST_KEYSTORE_PASSWORD}
ENV TEST_KEYSTORE_KEY_ALIAS=${TEST_KEYSTORE_KEY_ALIAS}
ENV TEST_KEYSTORE_KEY_PASSWORD=${TEST_KEYSTORE_PASSWORD}

# Dump checksum.
WORKDIR ${ANDROID_HOME}
RUN echo "${SDK_SHA} sdk.zip" > sdk.sha

# Install required packages.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openjdk-8-jdk \
    curl \
    unzip && \
    rm -rf /var/lib/apt/lists/*

# Install Android SDK and SDK Manager.
RUN curl -o sdk.zip -L $SDK_URL && \
    sha256sum -c sdk.sha && \
    unzip sdk.zip && \
    rm sdk.zip && \
    yes | ./tools/bin/sdkmanager --licenses
RUN $ANDROID_HOME/tools/bin/sdkmanager --update

# Install tools
RUN $ANDROID_HOME/tools/bin/sdkmanager \
    "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
    "platforms;android-${ANDROID_VERSION}" \
    "platform-tools"

COPY ${TEST_KEYSTORE_SOURCE_FILE} ${TEST_KEYSTORE_LOCATION}
WORKDIR /app
