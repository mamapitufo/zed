# zed

Get your session cookie. This simple tool takes a target url and login
credentials and tries to retrieve the value of the given cookie.

Zed assumes that there are `username` and `password` fields in a form
on `ZED_LOGIN_TARGET`, as well as a submit button.

## Usage

```sh
# export ZED_LOGIN_TARGET=https://www.example.com ZED_COOKIE=mySession
#   ZED_USERNAME=test-user ZED_PASSWORD=password1 ZED_VERBOSE= zed
Cookie 'mySession' for user 'test-user' at 'https://www.example.com':
X+pN/8FthIx2CVjQbbjAIBBD/52iE+gCxl1GewQrh9tyNKrM6f6938f3b72c60359H4sIAAAAAAAAAx2N0Q2AIBBD/52iE+gCxl1OaQCDgEfO/J9TC8nIA2SagAAAA==
```

## Options

Zed is configured via environment variables:

* `ZED_LOGIN_TARGET`: url with the login form.
* `ZED_COOKIE`: name of the cookie that you want to print out.
* `ZED_USERNAME` and `ZED_PASSWORD`: login credentials.
* `ZED_PROXY`: url for a proxy server, i.e. `http://proxy.example.com:3128/`.
* `ZED_DEBUG`: turn on browser console logs by defining this variable in the
  environment.
* `ZED_VERBOSE`: echo user, cookie, and environment name in response.

