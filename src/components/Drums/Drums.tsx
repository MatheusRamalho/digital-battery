'use client'

import { useEffect, useState } from 'react'

import { DrumsKey } from './DrumsKey'

interface KeyNoteProps {
    keyNote: string
}

export const Drums = () => {
    const [composition, setComposition] = useState('')

    const handlePlayComposition = () => {
        if (composition) {
            const compositionArrayKeys = composition.split('')
            playComposition(compositionArrayKeys)
            setComposition('')
        }
    }

    const playComposition = (sequenceOfMusicalNotes: string[]) => {
        let waitTimeInMilliseconds = 0

        for (const keyNote of sequenceOfMusicalNotes) {
            setTimeout(() => {
                playSound({
                    keyNote: `key${keyNote}`,
                })
            }, waitTimeInMilliseconds)

            waitTimeInMilliseconds = waitTimeInMilliseconds + 250
        }
    }

    const playSound = ({ keyNote }: KeyNoteProps) => {
        const sound = document.querySelector(
            `#s_${keyNote}`,
        ) as HTMLAudioElement | null
        const key = document.querySelector(`div[data-key="${keyNote}"]`)

        if (sound) {
            sound.currentTime = 0
            sound.play()
        }

        if (key) {
            key.classList.add('!bg-green-700')

            setTimeout(() => {
                key?.classList.remove('!bg-green-700')
            }, 300) // 0.3 segundos...
        }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
        playSound({
            keyNote: event.code.toLowerCase(),
        })
    }

    const handleDocumentKeyUp = (event: KeyboardEvent) => {
        handleKeyUp(event)
    }

    useEffect(() => {
        document.body.addEventListener('keyup', handleDocumentKeyUp)
    }, [])

    return (
        <>
            <div id="drums-keys" className="grid grid-cols-3 gap-3 my-10">
                <DrumsKey keyLetter="Q" />
                <DrumsKey keyLetter="W" />
                <DrumsKey keyLetter="E" />

                <DrumsKey keyLetter="A" />
                <DrumsKey keyLetter="S" />
                <DrumsKey keyLetter="D" />

                <DrumsKey keyLetter="Z" />
                <DrumsKey keyLetter="X" />
                <DrumsKey keyLetter="C" />
            </div>

            <div id="drums-composer" className="w-[16.25rem] mt-8">
                <input
                    className="w-full h-14 py-2 px-4 border-none rounded-lg bg-gray-700 text-base uppercase text-white outline-none placeholder:text-sm placeholder:normal-case"
                    id="input"
                    type="text"
                    placeholder="Faça uma composição..."
                    value={composition}
                    onChange={(event) => setComposition(event.target.value)}
                />

                <button
                    type="button"
                    onClick={handlePlayComposition}
                    className="cursor-pointer w-full h-auto mt-4 py-4 px-8 border-none rounded-lg text-white bg-green-700 text-center uppercase text-lg font-bold tracking-widest hover:bg-green-500"
                >
                    Play
                </button>
            </div>
        </>
    )
}
