import Head from 'next/head'
import {useRouter} from 'next/router'
import {useState} from 'react'

import {getDatabase, ref, set, onValue, child, get} from 'firebase/database'

import styles from '../styles/home.module.scss'

export default function Home() {
    const router = useRouter()
    const database = getDatabase()

    const [name, setName] = useState('')
    const [videoName, setVideoName] = useState('')
    const [videoLink, setVideoLink] = useState('')

    const [code, setCode] = useState('')

    const getRandomID = () => {
        return Math.random()
            .toString(36)
            .substring(2, 9)
            .concat(new Date().getTime().toString(36))
    }

    const createNewSync = () => {
        if (name.length < 0) {
            alert('Please enter a name')
            return
        } else if (videoName.length < 0) {
            alert('Please enter a video name')
            return
        } else if (videoLink.length < 0) {
            alert('Please enter a video link')
            return
        } else {
            const syncID = getRandomID()

            set(ref(database, `syncs/${syncID}`), {
                name: name,
                videoName: videoName,
                videoLink: videoLink,
                code: syncID,
				playing: false,
				progress: 0,
				timestamp: new Date().getTime()
            }).then(res => {
                setName('')
                setVideoName('')
                setVideoLink('')
                setCode('')

                router.push(`/watch?v=${syncID}`)
            })
        }
    }

    return (
        <div className={styles.mainContainer}>
            <Head>
                <title>YouTube Sync Creator | Sobhan Bera</title>
            </Head>

            <div className={styles.flexbox}>
                <div className={styles.createOrJoinSync}>
                    <p>Create A New Sync</p>

                    <input
                        placeholder='Enter your name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        maxLength={30}
                    />
                    <span>{`${name.length} / 30`}</span>

                    <input
                        placeholder="Enter youtube video's link"
                        value={videoLink}
                        onChange={e => setVideoLink(e.target.value)}
                        maxLength={200}
                    />
                    <span>{`${videoLink.length} / 200`}</span>

                    <input
                        placeholder="Enter video's name"
                        value={videoName}
                        onChange={e => setVideoName(e.target.value)}
                        maxLength={50}
                    />
                    <span>{`${videoName.length} / 50`}</span>

                    <button onClick={createNewSync}>Create Sync</button>
                </div>

                <div className={styles.createOrJoinSync}>
                    <p>Join A Sync</p>

                    <input
                        placeholder='Enter your name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        maxLength={30}
                    />
                    <span>{`${name.length} / 30`}</span>

                    <input
                        placeholder='Enter sync code'
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        maxLength={20}
                    />
                    <span>{`${code.length} / 20`}</span>

                    <button>Join Sync</button>
                </div>
            </div>
        </div>
    )
}
