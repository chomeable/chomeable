import React, { useState, useEffect, ReactDOM } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Input } from '@material-ui/core'
import Card from '../components/Card'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import cookie from 'react-cookie'

import Loading from '../components/Loading'
import getCookieJS from '../scripts/getCookie.js'
import getAuthUser from '../scripts/getAuthUser.js'

import { fetchUrl } from "../client"

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '85%',
    maxWidth: '400px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid black',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export default function Home() {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [isReady, setIsReady] = useState(false)
  const [authUser, setAuthUser] = useState(null)

  function openPopupPage(relativeUrl)
  {
    var param = {  };
    OpenWindowWithPost(fetchUrl+relativeUrl, "width=400, height=550, left=200, top=50, resizable=no, scrollbars=yes", "NewFile", param);
  }

  async function OpenWindowWithPost(url, windowoption, name, params)
  {
    let lv_authUser = await getAuthUser()
    let popup = window.open(url, name, windowoption);
    var checkPopupClosing = setInterval(async () => {
      if (popup.closed) {
        clearInterval(checkPopupClosing)
        if ((await getAuthUser() == null) !== (lv_authUser == null))
          window.location.reload()
      }
    }, 200)
    window.addEventListener("beforeunload", e => {
      popup.close()
    })
  }

  useEffect(async () => {
    await setAuthUser(await getAuthUser())
    setIsReady(true)
  }, [])

  function AuthUserButtons() {
    if (authUser == null) {
      return (
        <div className={styles.login}>
          <Button onClick={ () => openPopupPage('/signin') }>SIGN IN</Button>
          <Button onClick={ () => openPopupPage('/signup') }>SIGN UP</Button>
        </div>
      )
    } else {
      return (
        <div className={styles.login}>
          <Button onClick={ () => openPopupPage('/signout') }>SIGN OUT</Button>
        </div>
      )
    }
  }

  if (!isReady)
    return <Loading />
  return (
    <div className={styles.container}>
      <Head>
        <title>Chome</title>
        <meta name="description" content="This is the official site of chomeProgramming" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.header}>
          <div className={styles.menuBar}>
            <a href="/hireus">HIRE US</a>
            <a href="/about">ABOUT US</a>
          </div>

          {/* { () => authUserButtons() } */}
          <AuthUserButtons />

          <div className={styles.hamburger}>
            <div className={styles.hamburgerRow1}></div>
            <div className={styles.hamburgerRow2}></div>
            <div className={styles.hamburgerRow3}></div>
          </div>
        </div>

        <div className={styles.feed}>
          <Card
            img='https://earnable.vercel.app/favicon.png'
            link='https://earnable.vercel.app'
            name='Earnable'
          />
          {/* <Card
            img='https://opengraph.githubassets.com/d3470dfcd1e48a27c76b539aca1f431a90d1aaf3a74e73392fb3be8297c0f36e/chomeProgramming/yourf1'
            link='https://github.com/chomeProgramming/yourf1'
            name='YourF1'
          />

          <Card
            img='https://opengraph.githubassets.com/28297101fcc67d8d3ccf6f5f59c13ca88c4294b331d827c0bc09039b89e99ebe/chomeProgramming/clipable'
            link='https://github.com/chomeProgramming/clipable'
            name='Clipable'
          />

          <Card
            img='https://opengraph.githubassets.com/3ed4a58c755d137f043bd887f0afaa7e3d3a073a2cc14ad3fc530b5511cdcbd0/chomeProgramming/chome-speech-recognition'
            link='https://github.com/chomeProgramming/chome-speech-recognition'
            name='Voice Assistant'
          />

          <Card
            img='https://opengraph.githubassets.com/489e3bf4fef925895059fdcf065bbcc5105c7e4c3ff6a5a191c140a678f8ee24/chomeProgramming/quickstart'
            link='https://github.com/chomeProgramming/quickstart'
            name='Quickstart'
          /> */}
        </div>
      </main>
    </div>
  )
}