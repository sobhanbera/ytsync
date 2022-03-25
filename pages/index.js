import Head from 'next/head'
import {useState} from 'react'

import styles from '../styles/home.module.scss'

export default function Home() {
    const [name, setName] = useState('')
    const [videoName, setVideoName] = useState('')
    const [videoLink, setVideoLink] = useState('')

    const [code, setCode] = useState('')

    return (
        <div className={styles.mainContainer}>
            <Head>
                <title>YouTube Sync Creator | Sobhan Bera</title>
            </Head>

            <div className={styles.flexbox}>
                <div className={styles.createOrJoinSync}>
                    <p>Create A New Sync</p>
                    <input
                        placeholder="Enter your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder="Enter youtube video's link"
                        value={videoLink}
                        onChange={e => setVideoLink(e.target.value)}
                    />
                    <input
                        placeholder="Enter video's name"
                        value={videoName}
                        onChange={e => setVideoName(e.target.value)}
                    />
                    <button>Create Sync</button>
                </div>
                <div className={styles.createOrJoinSync}>
                    <p>Join A Sync</p>
                    <input
                        placeholder="Enter sync code"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                    <button>Join Sync</button>
                </div>
            </div>
        </div>
    )
}
