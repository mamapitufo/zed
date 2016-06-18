#!/usr/bin/env node

const Zombie = require('zombie')

const loginTarget = process.env.ZED_LOGIN_TARGET
const username = process.env.ZED_USERNAME
const proxy = process.env.ZED_PROXY
const password = process.env.ZED_PASSWORD
const cookieName = process.env.ZED_COOKIE

const zed = new Zombie()

zed.silent = !('ZED_DEBUG' in process.env)
if (!!proxy) zed.proxy = proxy

zed.visit(loginTarget)
  .then(fillAndSubmitLoginForm)
  .then(grabSessionCookie)
  .then(returnSessionCookie)
  .catch(logErrors)

function fillAndSubmitLoginForm() {
  return zed
    .fill('username', username)
    .fill('password', password)
    .pressButton('button[type="submit"]')
}

function grabSessionCookie() {
  const cookie = zed.getCookie(cookieName)
  if (!cookie) throw new Error(`Session cookie '${cookieName}' is missing!`)

  return cookie
}

function returnSessionCookie(value) {
  console.log(`cookies are delicious, here's '${cookieName}':`)
  console.log(value)
  process.exit(0)
}

function logErrors(err) {
  console.error('argh! something went wrong:', err)
  process.exit(1)
}

