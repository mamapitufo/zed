#!/usr/bin/env node

const Zombie = require('zombie')

const host = process.env.ZED_TARGET || 'http://localhost:3000'
const username = process.env.ZED_USERNAME || 'user@test.com'
const proxy = process.env.ZED_PROXY
const password = process.env.ZED_PASSWORD || 'password'
const sessionCookie = process.env.ZED_COOKIE || 'session'

const zed = new Zombie()

zed.silent = !process.env.ZED_DEBUG
if (!!proxy) zed.proxy = proxy

zed.visit(`${host}/login`)
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
  const cookie = zed.getCookie(sessionCookie)
  if (!cookie) throw new Error(`Session cookie '${sessionCookie}' is missing!`)

  return cookie
}

function returnSessionCookie(value) {
  console.log(`cookies are delicious, your '${sessionCookie}' value:`)
  console.log(value)
  process.exit(0)
}

function logErrors(err) {
  console.error('argh! something went wrong:', err)
  process.exit(1)
}

