import React from "react"
import { useEffect, useState } from "react"
import NavSettings from "@/back-end/NavSettings"
import TabataPC from "@/Tabata/TabataPC"
import TabataMobile from "@/Tabata/TabataMobile"
const Tabata = () => {
    const [dataSet, setDataSet] = useState(false)
    const [allTabatas, setAllTabatas] = useState([])
    const [prepareTime, setPrepareTime] = useState(0)
    const [prepareTimeType, setPrepareTimeType] =
        useState("s") /* s for seconds and m for minutes */
    const [workTime, setWorkTime] = useState(0)
    const [workTimeType, setWorkTimeType] = useState("s") /* s for seconds and m for minutes */
    const [restTime, setRestTime] = useState(0)
    const [restTimeType, setRestTimeType] = useState("s")
    const [cyclesAmount, setCyclesAmount] = useState(1)
    const [setsAmount, setSetsAmount] = useState(1)
    const [restSetsTime, setRestSetsTime] = useState(0)
    const [restSetsTimeType, setRestSetsTimeType] = useState("s")
    const [cooldownTime, setCooldownTime] = useState(0)
    const [cooldownTimeType, setCooldownTimeType] = useState("s")
    const [showInputTabata, setShowInputTabata] =
        useState(true) /* beginning input to create a timer */
    const [showTabataEdit, setShowTabataEdit] =
        useState(false) /* is after you click continue for the new tabata to save and to play */

    const [editTimer, setEditTimer] = useState({
        title: "Hiit Workout",
        prepare: { timeUnit: "s", value: 10 },
        work: { timeUnit: "s", value: 20 },
        rest: { timeUnit: "s", value: 10 },
        cycles: 4,
        sets: 2,
        restSets: { timeUnit: "s", value: 15 },
        cooldown: { timeUnit: "s", value: 15 },
        uploaded: false,
        index: 0,
    })
    const [showAllTabatas, setShowAllTabatas] = useState(false)
    const [showPlayTabata, setShowPlayTabata] = useState(false)
    const [showMusic, setShowMusic] = useState(false)
    const [allPlaylists, setAllPlaylists] = useState([])
    const [selectedPlayMusic, setSelectedPlayMusic] = useState("")
    const [windowWidth, setWindowWidth] = useState(0)

    /* Play Tabata for that backend is synced */
    const [fullScreen, setFullScreen] = useState(true)
    const [indexTimer, setIndexTimer] = useState(0)
    const [timerData, setTimerData] = useState([])
    const [startSeconds, setStartSeconds] = useState("")
    const [title, setTitle] = useState("")
    const [secondsLeft, setSecondsLeft] = useState(null)
    const [trigger, setTrigger] = useState(false)
    const [totalTime, setTotalTime] = useState(0)
    const [pauseBool, setPauseBool] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [indexMusic, setIndexMusic] = useState(0)
    const [musicUrl, setMusicUrl] = useState("")
    const [currentTime, setCurrentTime] = useState("")
    const [maxTime, setMaxTime] = useState("")
    const [musicLoading, setMusicLoading] = useState(true)
    useEffect(() => {
        const handleResize = () => {
            const allPages = document.querySelectorAll(".page")
            const nav = document.querySelector(".nav")

            for (let i = allPages.length - 1; i >= 0; i--) {
                allPages[i].style.top = `${nav.offsetHeight}px`
            }

            setWindowWidth(window.innerWidth)
        }
        const handleOrientationChange = () => {
            const allPages = document.querySelectorAll(".page")
            const nav = document.querySelector(".nav")

            // Clear any existing transitions
            nav.style.transition = "none"

            // Trigger a reflow
            nav.offsetHeight

            // Apply the new top value
            for (let i = allPages.length - 1; i >= 0; i--) {
                allPages[i].style.top = `${nav.offsetHeight}px`
            }

            // Restore the transition after a brief delay
            setTimeout(() => {
                nav.style.transition = "1s"
            }, 100) // Adjust the delay as needed

            setWindowWidth(window.innerWidth)
        }

        // Initial setup
        handleResize()

        window.addEventListener("resize", handleResize)
        window.addEventListener("orientationchange", handleOrientationChange)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("orientationchange", handleOrientationChange)
        }
    }, [])
    useEffect(() => {
        const body = document.querySelector(".body")
        body.style.color = "black"
        const allPages = document.querySelectorAll(".page")
        const nav = document.querySelector(".nav")
        for (let i = allPages.length - 1; i >= 0; i--) {
            allPages[i].style.top = `${nav.offsetHeight}px`
        }
        nav.style.color = "black"
    }, [])
    useEffect(() => {
        if (localStorage.getItem("tabata-data")) {
            setAllTabatas(JSON.parse(localStorage.getItem("tabata-data")))
        } else {
            setAllTabatas([])
        }
        if (localStorage.getItem("playlists-data")) {
            setAllPlaylists(JSON.parse(localStorage.getItem("playlists-data")))
        } else {
            setAllPlaylists([])
        }
        setDataSet(true)
    }, [])
    useEffect(() => {
        if (dataSet) {
            localStorage.setItem("tabata-data", JSON.stringify(allTabatas))
        }
    }, [allTabatas, dataSet])
    useEffect(() => {
        if (dataSet) {
            localStorage.setItem("playlists-data", JSON.stringify(allPlaylists))
        }
    }, [allPlaylists, dataSet])
    /* Lets set some values for our tabata */
    useEffect(() => {
        setPrepareTime(15)
        setWorkTime(20)
        setRestTime(10)
        setCyclesAmount(5)
        setSetsAmount(3)
        setRestSetsTime(20)
        setCooldownTime(30)
    }, [])
    useEffect(() => {}, [])
    return (
        <>
            <NavSettings />
            <TabataPC
                prepareTime={prepareTime}
                setPrepareTime={setPrepareTime}
                prepareTimeType={prepareTimeType}
                setPrepareTimeType={setPrepareTimeType}
                workTime={workTime}
                setWorkTime={setWorkTime}
                setWorkTimeType={setWorkTimeType}
                workTimeType={workTimeType}
                restTime={restTime}
                setRestTime={setRestTime}
                restTimeType={restTimeType}
                setRestTimeType={setRestTimeType}
                cyclesAmount={cyclesAmount}
                setCyclesAmount={setCyclesAmount}
                setsAmount={setsAmount}
                setSetsAmount={setSetsAmount}
                restSetsTime={restSetsTime}
                setRestSetsTime={setRestSetsTime}
                restSetsTimeType={restSetsTimeType}
                setRestSetsTimeType={setRestSetsTimeType}
                cooldownTime={cooldownTime}
                setCooldownTime={setCooldownTime}
                cooldownTimeType={cooldownTimeType}
                setCooldownTimeType={setCooldownTimeType}
                showInputTabata={showInputTabata}
                setShowInputTabata={setShowInputTabata}
                showTabataEdit={showTabataEdit}
                setShowTabataEdit={setShowTabataEdit}
                editTimer={editTimer}
                setEditTimer={setEditTimer}
                allTabatas={allTabatas}
                setAllTabatas={setAllTabatas}
                showAllTabatas={showAllTabatas}
                setShowAllTabatas={setShowAllTabatas}
                showPlayTabata={showPlayTabata}
                setShowPlayTabata={setShowPlayTabata}
                setShowMusic={setShowMusic}
                showMusic={showMusic}
                allPlaylists={allPlaylists}
                setAllPlaylists={setAllPlaylists}
                selectedPlayMusic={selectedPlayMusic}
                setSelectedPlayMusic={setSelectedPlayMusic}
                windowWidth={windowWidth}
                fullScreen={fullScreen}
                setFullScreen={setFullScreen}
                indexTimer={indexTimer}
                setIndexTimer={setIndexTimer}
                timerData={timerData}
                setTimerData={setTimerData}
                startSeconds={startSeconds}
                setStartSeconds={setStartSeconds}
                title={title}
                setTitle={setTitle}
                secondsLeft={secondsLeft}
                setSecondsLeft={setSecondsLeft}
                trigger={trigger}
                setTrigger={setTrigger}
                totalTime={totalTime}
                setTotalTime={setTotalTime}
                pauseBool={pauseBool}
                setPauseBool={setPauseBool}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
                indexMusic={indexMusic}
                setIndexMusic={setIndexMusic}
                musicUrl={musicUrl}
                setMusicUrl={setMusicUrl}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
                maxTime={maxTime}
                setMaxTime={setMaxTime}
                musicLoading={musicLoading}
                setMusicLoading={setMusicLoading}
            />

            {
                <TabataMobile
                    prepareTime={prepareTime}
                    setPrepareTime={setPrepareTime}
                    prepareTimeType={prepareTimeType}
                    setPrepareTimeType={setPrepareTimeType}
                    workTime={workTime}
                    setWorkTime={setWorkTime}
                    setWorkTimeType={setWorkTimeType}
                    workTimeType={workTimeType}
                    restTime={restTime}
                    setRestTime={setRestTime}
                    restTimeType={restTimeType}
                    setRestTimeType={setRestTimeType}
                    cyclesAmount={cyclesAmount}
                    setCyclesAmount={setCyclesAmount}
                    setsAmount={setsAmount}
                    setSetsAmount={setSetsAmount}
                    restSetsTime={restSetsTime}
                    setRestSetsTime={setRestSetsTime}
                    restSetsTimeType={restSetsTimeType}
                    setRestSetsTimeType={setRestSetsTimeType}
                    cooldownTime={cooldownTime}
                    setCooldownTime={setCooldownTime}
                    cooldownTimeType={cooldownTimeType}
                    setCooldownTimeType={setCooldownTimeType}
                    showInputTabata={showInputTabata}
                    setShowInputTabata={setShowInputTabata}
                    showTabataEdit={showTabataEdit}
                    setShowTabataEdit={setShowTabataEdit}
                    editTimer={editTimer}
                    setEditTimer={setEditTimer}
                    allTabatas={allTabatas}
                    setAllTabatas={setAllTabatas}
                    showAllTabatas={showAllTabatas}
                    setShowAllTabatas={setShowAllTabatas}
                    showPlayTabata={showPlayTabata}
                    setShowPlayTabata={setShowPlayTabata}
                    setShowMusic={setShowMusic}
                    showMusic={showMusic}
                    allPlaylists={allPlaylists}
                    setAllPlaylists={setAllPlaylists}
                    selectedPlayMusic={selectedPlayMusic}
                    setSelectedPlayMusic={setSelectedPlayMusic}
                    fullScreen={fullScreen}
                    setFullScreen={setFullScreen}
                    indexTimer={indexTimer}
                    setIndexTimer={setIndexTimer}
                    timerData={timerData}
                    setTimerData={setTimerData}
                    startSeconds={startSeconds}
                    setStartSeconds={setStartSeconds}
                    title={title}
                    setTitle={setTitle}
                    secondsLeft={secondsLeft}
                    setSecondsLeft={setSecondsLeft}
                    trigger={trigger}
                    setTrigger={setTrigger}
                    totalTime={totalTime}
                    setTotalTime={setTotalTime}
                    pauseBool={pauseBool}
                    setPauseBool={setPauseBool}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    indexMusic={indexMusic}
                    setIndexMusic={setIndexMusic}
                    musicUrl={musicUrl}
                    setMusicUrl={setMusicUrl}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    maxTime={maxTime}
                    setMaxTime={setMaxTime}
                    musicLoading={musicLoading}
                    setMusicLoading={setMusicLoading}
                    windowWidth={windowWidth}
                />
            }
        </>
    )
}
export default Tabata
