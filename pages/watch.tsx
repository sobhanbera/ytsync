import Head from 'next/head'
import {useRouter} from 'next/router'
import React, {ReactElement, useRef, useEffect, useState} from 'react'

import ReactPlayer from 'react-player'
import {getDatabase, ref, set, onValue, child, get} from 'firebase/database'

interface Props {}

export default function WatchSync({}: Props): ReactElement {
    const {query} = useRouter()
    const player = useRef<ReactPlayer>(null)
    const database = getDatabase()

    const [url, setUrl] = useState<string>('')
    const [playing, setPlaying] = useState<boolean>(false)
    const [currentPos, setCurrentPos] = useState<number>(0)

    useEffect(() => {
        if (query.v) {
            setUrl(`https://www.youtube.com/watch?v=${query.v}`)
            onValue(ref(database, `syncs/${query.v}`), snapshot => {
                if (snapshot.val()) {
                    const values = snapshot.val()

                    console.log(values)
                    setUrl(values.videoLink)

                    // console.log(new Date().getTime() - values.timestamp)
                    const progress =
                        (new Date().getTime() - values.timestamp) / 1000
                    if (progress > 0) player.current?.seekTo(progress)
						setCurrentPos(progress)
                    setPlaying(true)
                }
            })
        }
    }, [query])

    return (
        <div>
            <Head>
                <title>Listen To Songs</title>
            </Head>

            <ReactPlayer
                ref={player}
                className='react-player'
                width='900px'
                height='468px'
                url={url}
                pip={false}
                playing={playing}
                controls={true}
                light={false}
                loop={true}
                playbackRate={1}
                volume={1}
                muted={false}
                onReady={() => {}}
                onStart={() => {}}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnablePIP={() => {}}
                onDisablePIP={() => {}}
                onBuffer={() => {}}
                onPlaybackRateChange={() => {}}
                onSeek={e => {}}
                onEnded={() => {}}
                onError={e => {}}
                onProgress={e => setCurrentPos(e.playedSeconds)}
            />
        </div>
    )
}
