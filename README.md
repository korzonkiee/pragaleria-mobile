Pragaleria Mobile Application
=========

##### DEMO https://drive.google.com/open?id=1VG5oX-pbZdJF3Z5Qqv0zRJO_S5rh6yOQ


![Image representing Pragaleria Mobile Application](https://raw.githubusercontent.com/korzonkiee/pragaleria-mobile/dev/pragaleria-poster.png)


* Development environment

To start the development environment firstly install `yarn` on your system:
> `https://yarnpkg.com/lang/en/docs/install/#debian-stable`  

Once it is complete, simply install the dependencies by: `yarn install`  
Afterwards, we start the webpack-hot-reload server by `yarn start`.  
Now connect your phone to the PC and in other terminal window run `yarn run android`. It will bundle the application source code and ship it to the phone. To enable react-hot-reloading, please enter `adb shell input keyevent 82` in third terminal window, it will open a react modal on your phone and you can select hot module replacement and hot reloading in this view.
