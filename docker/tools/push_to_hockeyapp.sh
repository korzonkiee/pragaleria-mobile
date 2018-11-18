#!/usr/bin/env sh

curl \
  -F "status=2" \
  -F "notify=0" \
  -F "notes=Automatic CI build" \
  -F "commit_sha=$TRAVIS_COMMIT" \
  -F "dsym=@app-staging.apk" \
  -H "X-HockeyAppToken: $HOCKEY_APP_TOKEN" \
  https://rink.hockeyapp.net/api/2/apps/$HOCKEY_APP_ID/app_versions/upload
