import React from "react"
import { useEffect, useState, useRef } from "react"
import ExportedImage from "next-image-export-optimizer"
import fullScreenImage from "../../public/fullScreen.png"
import leftMusicImage from "../../public/leftMusic.png"
import playMusicImage from "../../public/playMusic.png"
import pauseMusicImage from "../../public/pauseMusic.png"
import rightMusicImage from "../../public/rightMusic.png"
import data from "../MusicData.json"
import exitFullScreenImage from "../../public/exitFullScreen.png"
/* Images Cover */
import lemonTreeCover from "../../public/music/images/lemonTreeCover.jpg"
import victoryCover from "../../public/music/images/victoryCover.jpg"
import faceOffCover from "../../public/music/images/faceOffCover.jpg"
import addImage from "../../public/add.png"
import removeImage from "../../public/remove.png"
import hipsCover from "../../public/music/images/hipsCover.jpeg"
import canYouHearMusicCover from "../../public/music/images/canYouHearMusicCover.jpg"
import tonCombatCover from "../../public/music/images/tonCombatCover.jpg"
const PlayTabata = (props) => {
    const {
        setShowTabataEdit,
        setShowPlayTabata,
        editTimer,
        selectedPlayMusic,
        fullScreen,
        setFullScreen,
        indexTimer,
        setIndexTimer,
        timerData,
        setTimerData,
        startSeconds,
        setStartSeconds,
        title,
        setTitle,

        secondsLeft,
        setSecondsLeft,
        trigger,
        setTrigger,
        totalTime,
        setTotalTime,
        pauseBool,
        setPauseBool,
        isPlaying,
        setIsPlaying,
        isLoaded,
        setIsLoaded,
        indexMusic,
        setIndexMusic,
        musicUrl,
        setMusicUrl,
        currentTime,
        setCurrentTime,
        maxTime,
        setMaxTime,
        musicLoading,
        setMusicLoading,
    } = props
    const music = data.allMusic

    let timeoutId

    useEffect(() => {
        const checkFullScreen = () => {
            // Check if the window's inner width and inner height match the screen's dimensions.
            if (
                window.innerWidth === window.screen.width &&
                window.innerHeight === window.screen.height
            ) {
                setFullScreen(true)
            } else {
                setFullScreen(false)
            }
        }

        // Add an event listener to listen for changes in window dimensions.
        window.addEventListener("resize", checkFullScreen)

        // Call the checkFullScreen function when the component mounts to check its initial state.
        checkFullScreen()

        // Remove the event listener when the component unmounts to prevent memory leaks.
        return () => {
            window.removeEventListener("resize", checkFullScreen)
        }
    }, [])
    const getInfo = (title) => {
        for (let i = 0; i < music.length; i++) {
            if (music[i].title == title) {
                return music[i]
            }
        }
    }
    const getImage = (imageUrl) => {
        if (imageUrl == "lemonTreeCover") {
            return lemonTreeCover
        } else if (imageUrl == "victoryCover") {
            return victoryCover
        } else if (imageUrl == "faceOffCover") {
            return faceOffCover
        } else if (imageUrl == "hipsCover") {
            return hipsCover
        } else if (imageUrl == "canYouHearMusicCover") {
            return canYouHearMusicCover
        } else if (imageUrl == "tonCombatCover") {
            return tonCombatCover
        }
    }
    const exitFullScreen = () => {
        const fullscreenElement =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement

        if (fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
    }
    const enterFullScreen = () => {
        const element = document.documentElement // This selects the HTML root element

        if (
            element.requestFullscreen ||
            element.mozRequestFullScreen ||
            element.webkitRequestFullscreen ||
            element.msRequestFullscreen
        ) {
            if (element.requestFullscreen) {
                element.requestFullscreen()
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen()
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen()
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen()
            }
        }
    }
    useEffect(() => {
        const nav = document.querySelector(".nav")
        const navMobile = document.querySelector(".nav__mobile")

        nav.style.display = "none"
        navMobile.style.display = "none"

        const tabataPC = document.querySelector(".tabata__page__PC")
        tabataPC.style.position = "static"
        const row = document.querySelector(".tabata__page__PC__row")
        row.style.position = "static"
        row.style.padding = "0"
    }, [])
    const exitPlay = () => {
        setSecondsLeft(null)
        setStartSeconds("")
        setTotalTime(0)
        setTimerData([])
        setPauseBool(false)
        setIndexMusic(0)
        setIsPlaying(false)
        setIsLoaded(false)
        setMusicUrl("")
        setCurrentTime("")
        setMaxTime("")
        setMusicLoading(true)
        const nav = document.querySelector(".nav")
        const navMobile = document.querySelector(".nav__mobile")

        nav.style.display = "flex"
        navMobile.style.display = "block"

        const tabataPC = document.querySelector(".tabata__page__PC")
        tabataPC.style.position = "absolute"
        const row = document.querySelector(".tabata__page__PC__row")
        row.style.position = "relative"
        row.style.padding = "4vh 5vw"
        const tabataMobile = document.querySelector(".tabata__page__mobile")
        tabataMobile.style.position = "absolute"
        const rowMobile = document.querySelector(".tabata__page__mobile__row")
        rowMobile.style.position = "relative"
        rowMobile.style.padding = "4vh 5vw"
        const allPages = document.querySelectorAll(".page")
        for (let i = allPages.length - 1; i >= 0; i--) {
            allPages[i].style.top = `${nav.offsetHeight}px`
        }
        setShowPlayTabata(false)
        setShowTabataEdit(true)
        exitFullScreen()
        window.scrollTo({
            top: 0,
            behavior: "smooth", // This provides a smooth scrolling effect (optional)
        })
    }
    const getTitle = (title) => {
        if (title == "prepare") {
            return "Prepariere"
        } else if (title == "work") {
            return "Trainiere"
        } else if (title == "rest") {
            return "Pause"
        } else if (title == "restSets") {
            return "Nächster Satz"
        } else if (title == "cooldown") {
            return "Abkühlung"
        }
    }
    const nextTasks = timerData.map((el, index) => {
        if (
            index > indexTimer &&
            index <= indexTimer + (selectedPlayMusic !== "" ? (fullScreen ? 3 : 2) : 4)
        ) {
            return (
                <div
                    className="tabata__page__PC__play__next__item"
                    style={{
                        background:
                            el.info == "work"
                                ? " rgba(196, 52, 57, 1)"
                                : " rgba(215, 215, 215, 1)",
                        color: el.info == "work" ? "white" : "black",
                    }}
                    key={index}
                >
                    <h3>{getTitle(el.info)}</h3>
                    <div>
                        <h3>{el.value}</h3> <p>sek</p>
                    </div>
                </div>
            )
        }
    })
    useEffect(() => {
        if (timerData.length == 0) {
            let array = []
            let prepare =
                /* Everything in seconds */
                editTimer.prepare.timeUnit == "s"
                    ? editTimer.prepare.value
                    : editTimer.prepare.value * 60
            let work =
                /* Everything in seconds */
                editTimer.work.timeUnit == "s" ? editTimer.work.value : editTimer.work.value * 60
            let rest =
                /* Everything in seconds */
                editTimer.rest.timeUnit == "s" ? editTimer.rest.value : editTimer.rest.value * 60
            let restSets =
                /* Everything in seconds */
                editTimer.restSets.timeUnit == "s"
                    ? editTimer.restSets.value
                    : editTimer.restSets.value * 60
            let cooldown =
                /* Everything in seconds */
                editTimer.cooldown.timeUnit == "s"
                    ? editTimer.cooldown.value
                    : editTimer.cooldown.value * 60

            let cycles = editTimer.cycles
            let sets = editTimer.sets
            if (parseInt(prepare) !== 0) {
                array.push({ info: "prepare", value: prepare })
            }
            for (let i = 0; i < sets; i++) {
                for (let k = 0; k < cycles; k++) {
                    if (parseInt(work) !== 0) {
                        array.push({ info: "work", value: work })
                    }
                    if (k + 1 == cycles) {
                    } else {
                        if (parseInt(rest) !== 0) {
                            array.push({ info: "rest", value: rest })
                        }
                    }
                }
                if (i + 1 == sets) {
                } else {
                    if (parseInt(restSets) !== 0) {
                        array.push({ info: "restSets", value: restSets })
                    }
                }
            }
            if (parseInt(cooldown) !== 0) {
                array.push({ info: "cooldown", value: cooldown })
            }
            setTimerData([...array])
        }
    }, [])
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60

        const formattedHours = hours.toString().padStart(2, "0")
        const formattedMinutes = minutes.toString().padStart(2, "0")
        const formattedSeconds = remainingSeconds.toString().padStart(2, "0")

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    }
    const start = (seconds, index) => {
        setIndexTimer(index)
        setSecondsLeft(seconds)
        setTitle(timerData[index].info)
        setTrigger(!trigger)
    }
    useEffect(() => {
        if (secondsLeft > 0 && !pauseBool) {
            timeoutId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1)
                if (3 == secondsLeft - 1) {
                    playAudio()
                }
                setTotalTime(totalTime + 1)
            }, 1000)
        }

        return () => clearTimeout(timeoutId)
    }, [secondsLeft, trigger])
    useEffect(() => {
        if (timerData.length !== 0 && secondsLeft == null && startSeconds == "") {
            start(timerData[0].value, 0)
            setStartSeconds(timerData[0].value)
        }
    }, [timerData])
    const pause = () => {
        clearTimeout(timeoutId)
        setPauseBool(true)
    }
    useEffect(() => {
        if (pauseBool) {
            clearTimeout(timeoutId)
        }
    }, [pauseBool])
    const playAudio = () => {
        const audioElement = document.getElementById("audio-element")
        if (audioElement && !isLoaded) {
            audioElement.load() // Preload the audio
            setIsLoaded(true)
        }

        if (audioElement) {
            audioElement.play().catch((error) => {
                console.error("Error playing audio:", error)
            })
        }
    }
    useEffect(() => {
        if (secondsLeft == 0 && indexTimer + 1 < timerData.length && timerData.length !== 0) {
            start(timerData[indexTimer + 1].value, indexTimer + 1)
            setStartSeconds(timerData[indexTimer + 1].value)
        }
        if (secondsLeft == 3) {
            playAudio()
        }
        if (indexTimer + 1 !== timerData.length && secondsLeft !== 0) {
            if (secondsLeft <= 3 && selectedPlayMusic !== "") {
                const audioElement = document.getElementById("music")
                audioElement.volume = 0.3
            } else if (selectedPlayMusic !== "") {
                const audioElement = document.getElementById("music")
                audioElement.volume = 1
            }
        }
    }, [secondsLeft])
    useEffect(() => {
        if (selectedPlayMusic !== "") {
            if (indexTimer + 1 !== timerData.length && secondsLeft == 1) {
                const audioElement = document.getElementById("music")

                audioElement.play().catch((error) => {
                    console.error("Error playing audio:", error)
                })
                setIsPlaying(true)
            }
        }
    }, [selectedPlayMusic])
    useEffect(() => {
        if (selectedPlayMusic !== "") {
            setMusicUrl(`/music/songs/${getInfo(selectedPlayMusic.songs[indexMusic]).music}.mp3`)
        }
    }, [indexMusic, selectedPlayMusic])
    useEffect(() => {
        if (musicUrl !== "" && selectedPlayMusic !== "") {
            if (indexTimer + 1 == timerData.length && secondsLeft == 0) {
            } else {
                const audioElement = document.getElementById("music")
                audioElement.src = musicUrl

                audioElement.load() // Load the audio
                audioElement.play() // Play the audio
                setIsPlaying(true)
            }
        }
    }, [musicUrl])
    function secondsToTime(seconds) {
        const minutes = Math.floor(parseInt(seconds) / 60)
        const formattedMinutes = String(minutes).padStart(1, "0")

        const formattedSeconds = String(parseInt(seconds) % 60).padStart(2, "0")

        return `${formattedMinutes}:${formattedSeconds}`
    }
    return (
        <div className="tabata__page__PC__play">
            {indexTimer + 1 == timerData.length && secondsLeft == 0 ? (
                ""
            ) : selectedPlayMusic !== "" && selectedPlayMusic.songs.length !== indexMusic ? (
                <ExportedImage
                    src={getImage(getInfo(selectedPlayMusic.songs[indexMusic]).imageLink)}
                    unoptimized={true}
                    alt="chevronLeft"
                    id="playBackgroundRight"
                    onClick={() => {
                        enterFullScreen()
                        setFullScreen(true)
                    }}
                />
            ) : (
                ""
            )}
            {selectedPlayMusic !== "" ? (
                <>
                    {indexTimer + 1 == timerData.length && secondsLeft == 0 ? (
                        ""
                    ) : (
                        <audio
                            id="music"
                            src={`/music/songs/${
                                getInfo(selectedPlayMusic.songs[indexMusic]).music
                            }.mp3`}
                            onEnded={() => {
                                if (indexMusic + 1 >= selectedPlayMusic.songs.length) {
                                    setIndexMusic(0)
                                } else {
                                    setIndexMusic(indexMusic + 1)
                                }
                            }}
                            onPlaying={(e) => {
                                const audio = document.getElementById("music")
                                setMusicLoading(false)
                                setMaxTime(audio.duration)
                                if (isNaN(audio.currentTime)) {
                                    setCurrentTime(0)
                                } else {
                                    setCurrentTime(audio.currentTime)
                                }
                            }}
                            onTimeUpdate={() => {
                                const audio = document.getElementById("music")
                                if (isNaN(audio.currentTime)) {
                                    setCurrentTime(0)
                                } else {
                                    setCurrentTime(audio.currentTime)
                                }
                                setCurrentTime(audio.currentTime)
                            }}
                            onCanPlayThrough={() => {
                                setMusicLoading(false)
                            }}
                            onLoad={() => {
                                setMusicLoading(true)
                            }}
                            onLoadStart={() => {
                                setMusicLoading(true)
                            }}
                            onPlay={() => {
                                setMusicLoading(false)
                            }}
                        ></audio>
                    )}
                </>
            ) : (
                ""
            )}
            <audio src="/sound/countdown.mp3" id="audio-element" preload="auto"></audio>
            {fullScreen ? (
                <ExportedImage
                    src={exitFullScreenImage}
                    unoptimized={true}
                    alt="chevronLeft"
                    className="tabata__page__PC__play__fullScreenImage"
                    onClick={() => {
                        exitFullScreen()
                        setFullScreen(false)
                    }}
                />
            ) : (
                <ExportedImage
                    src={fullScreenImage}
                    unoptimized={true}
                    alt="chevronLeft"
                    className="tabata__page__PC__play__fullScreenImage"
                    onClick={() => {
                        enterFullScreen()
                        setFullScreen(true)
                    }}
                />
            )}
            <div className="tabata__page__PC__play__box">
                {indexTimer + 1 == timerData.length && secondsLeft == 0 ? (
                    <div className="tabata__page__PC__play__box__finish">
                        <h2>Workout abgeschlossen!</h2>
                        <h3>Gesamtzeit: {formatTime(totalTime)}</h3>
                        <button
                            onClick={() => {
                                exitPlay()
                            }}
                        >
                            Ende
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="tabata__page__PC__play__timer">
                            <div
                                className="tabata__page__PC__play__timer__circle"
                                style={{
                                    background: `conic-gradient(${
                                        title == "work" || secondsLeft == 3 || secondsLeft == 1
                                            ? "rgba(196, 52, 57, 0.9)"
                                            : "rgba(215, 215, 215, 0.9)"
                                    } ${(100 / startSeconds) * secondsLeft * 3.6 + "deg"}, ${
                                        title == "work"
                                            ? "rgba(196, 52, 57, 0.2)"
                                            : "rgba(215, 215, 215, 0.2)"
                                    }   0deg)`,
                                }}
                            >
                                <div className="tabata__page__PC__play__timer__circle__hide">
                                    <h2
                                        style={{
                                            color:
                                                title == "work" ||
                                                secondsLeft == 3 ||
                                                secondsLeft == 1
                                                    ? "rgba(196, 52, 57, 0.9)"
                                                    : "rgba(215, 215, 215, 1)",
                                        }}
                                    >
                                        {secondsLeft}
                                    </h2>
                                </div>
                            </div>
                            <div className="tabata__page__PC__play__timer__total">
                                <h3>{formatTime(totalTime)}</h3>
                            </div>
                            <div className="tabata__page__PC__play__timer__title">
                                <h1
                                    style={{
                                        color:
                                            title == "work" ||
                                            secondsLeft == 3 ||
                                            secondsLeft == 1 ||
                                            indexTimer + 1 == timerData.length
                                                ? "rgba(196, 52, 57, 0.9)"
                                                : " rgba(105, 105, 105, 0.8)",
                                    }}
                                >
                                    {timerData.length == indexTimer
                                        ? "Geschafft!"
                                        : `${getTitle(title)}`}
                                </h1>
                            </div>
                            <div className="tabata__page__PC__play__timer__buttons">
                                {indexTimer + 1 == timerData.length && secondsLeft == 0 ? (
                                    ""
                                ) : (
                                    <button
                                        style={{
                                            background:
                                                title == "work" ||
                                                secondsLeft == 3 ||
                                                secondsLeft == 1 ||
                                                indexTimer + 1 == timerData.length
                                                    ? "rgba(196, 52, 57, 0.9)"
                                                    : "rgba(215, 215, 215, 1)",
                                        }}
                                        onClick={() => {
                                            if (pauseBool) {
                                                start(secondsLeft, indexTimer)
                                                setPauseBool(false)
                                            } else {
                                                pause()
                                            }
                                        }}
                                    >
                                        {pauseBool ? <>Weiter </> : <>Pause</>}
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        exitPlay()
                                    }}
                                >
                                    Ende
                                </button>
                            </div>
                        </div>
                        <div className="tabata__page__PC__play__next">
                            <div className="tabata__page__PC__play__next__tasksBox">
                                {indexTimer + 1 == timerData.length ? (
                                    <h2>Keine Aufgaben</h2>
                                ) : (
                                    <h2>Kommende Aufgaben</h2>
                                )}
                                <div className="tabata__page__PC__play__next__tasks">
                                    {nextTasks}
                                </div>
                            </div>
                            {selectedPlayMusic !== "" ? (
                                <div className="tabata__page__PC__play__timer__audio">
                                    <h2>Musik</h2>
                                    <div className="tabata__page__PC__play__timer__audio__music">
                                        <ExportedImage
                                            src={getImage(
                                                getInfo(selectedPlayMusic.songs[indexMusic])
                                                    .imageLink
                                            )}
                                            unoptimized={true}
                                            alt="chevronLeft"
                                            onClick={() => {
                                                enterFullScreen()
                                                setFullScreen(true)
                                            }}
                                        />
                                        <div className="tabata__page__PC__play__timer__audio__music__title">
                                            <h3>
                                                {
                                                    getInfo(selectedPlayMusic.songs[indexMusic])
                                                        .title
                                                }
                                            </h3>
                                            <p>
                                                {
                                                    getInfo(selectedPlayMusic.songs[indexMusic])
                                                        .artist
                                                }
                                            </p>
                                        </div>
                                        {musicLoading ? (
                                            <div className="tabata__page__PC__play__timer__audio__loading">
                                                <div className="loader"></div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="tabata__page__PC__play__timer__audio__music__currentTime">
                                                    {/* <div
                                                className="tabata__page__PC__play__timer__audio__music__currentTime__value"
                                                style={{
                                                    width: `${(currentTime / maxTime) * 150}px`,
                                                }}
                                            ></div> */}
                                                    <div>
                                                        <p>{secondsToTime(currentTime)}</p>
                                                        <p>{secondsToTime(maxTime)}</p>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min={0}
                                                        max={maxTime}
                                                        value={currentTime}
                                                        style={{
                                                            background: `linear-gradient(to right, #C4343A ${
                                                                (currentTime / maxTime) * 100
                                                            }%, rgba(215, 215, 215, 1) ${
                                                                (currentTime / maxTime) * 100
                                                            }%)`,
                                                        }}
                                                        onChange={(e) => {
                                                            const audioElement =
                                                                document.getElementById("music")
                                                            audioElement.currentTime =
                                                                e.target.value
                                                        }}
                                                    ></input>
                                                </div>
                                                <div className="tabata__page__PC__play__timer__audio__music__controls">
                                                    <>
                                                        <ExportedImage
                                                            src={leftMusicImage}
                                                            unoptimized={true}
                                                            alt="controls"
                                                            onClick={() => {
                                                                setIndexMusic((prev) => {
                                                                    if (prev - 1 < 0) {
                                                                        return (
                                                                            selectedPlayMusic.songs
                                                                                .length - 1
                                                                        )
                                                                    } else {
                                                                        return prev - 1
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                        <ExportedImage
                                                            src={
                                                                isPlaying
                                                                    ? pauseMusicImage
                                                                    : playMusicImage
                                                            }
                                                            unoptimized={true}
                                                            alt="controls"
                                                            onClick={() => {
                                                                if (isPlaying) {
                                                                    const audioElement =
                                                                        document.getElementById(
                                                                            "music"
                                                                        )
                                                                    let time =
                                                                        audioElement.currentTime
                                                                    audioElement.pause()
                                                                    setIsPlaying(false)
                                                                    setCurrentTime(time)
                                                                } else {
                                                                    const audioElement =
                                                                        document.getElementById(
                                                                            "music"
                                                                        )
                                                                    audioElement.play()
                                                                    audioElement.currentTime =
                                                                        currentTime
                                                                    setIsPlaying(true)
                                                                }
                                                            }}
                                                        />
                                                        <ExportedImage
                                                            src={rightMusicImage}
                                                            unoptimized={true}
                                                            alt="controls"
                                                            onClick={() => {
                                                                setIndexMusic((prev) => {
                                                                    if (
                                                                        prev + 1 >=
                                                                        selectedPlayMusic.songs
                                                                            .length
                                                                    ) {
                                                                        return 0
                                                                    } else {
                                                                        return prev + 1
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default PlayTabata
