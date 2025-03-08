import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faPen } from "@fortawesome/free-solid-svg-icons"
import ExportedImage from "next-image-export-optimizer"
import chevronLeft from "../../public/chevronLeft.png"
import pen from "../../public/pen.png"
import { useState, useEffect } from "react"
const EditTabataTimerPC = (props) => {
    const {
        editTimer,
        setEditTimer,
        setAllTabatas,
        allTabatas,
        setShowTabataEdit,
        setShowInputTabata,
        setShowAllTabatas,
        setShowPlayTabata,
        setShowMusic,
        selectedPlayMusic,
        setSelectedPlayMusic,
    } = props
    const [showEditTitle, setShowEditTitle] = useState(false)
    const [title, setTitle] = useState(editTimer.title)
    const [timerData, setTimerData] = useState([])
    const [totalTime, setTotalTime] = useState("")
    const [workTime, setWorkTime] = useState("")
    const [restTime, setRestTime] = useState("")
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
        let array = getInfo(editTimer)
        setTimerData(array)
    }, [editTimer])
    useEffect(() => {
        let prepareSeconds =
            editTimer.prepare.timeUnit == "s"
                ? editTimer.prepare.value / 1
                : editTimer.prepare.value * 60
        let workSeconds =
            editTimer.work.timeUnit == "s" ? editTimer.work.value / 1 : editTimer.work.value * 60
        let restSeconds =
            editTimer.rest.timeUnit == "s" ? editTimer.rest.value / 1 : editTimer.rest.value * 60
        let restSetsSeconds =
            editTimer.restSets.timeUnit == "s"
                ? editTimer.restSets.value / 1
                : editTimer.restSets.value * 60
        let cooldownSeconds =
            editTimer.cooldown.timeUnit == "s"
                ? editTimer.cooldown.value / 1
                : editTimer.cooldown.value * 60

        let cyclesAmount = editTimer.cycles / 1
        let sets = editTimer.sets / 1

        workSeconds = workSeconds * cyclesAmount * sets
        restSeconds = restSeconds * (cyclesAmount - 1) * sets
        restSetsSeconds = restSetsSeconds * (sets - 1)

        let totalAmountSeconds =
            prepareSeconds + workSeconds + restSeconds + restSetsSeconds + cooldownSeconds
        let totalAmountMinutes = parseInt(totalAmountSeconds / 60)
        let secondsLeftFromMinutes = totalAmountSeconds % 60
        setTotalTime({ minutes: totalAmountMinutes, seconds: secondsLeftFromMinutes })
        setWorkTime(workSeconds)
        setRestTime(prepareSeconds + restSeconds + restSetsSeconds + cooldownSeconds)
    }, [editTimer])
    const getTabataArrayData = (obj) => {
        let array = []
        array.push({ info: "prepare", data: obj.prepare })
        for (let i = 0; i < obj.sets; i++) {
            for (let k = 0; k < obj.cycles; k++) {
                array.push({ info: "work", data: obj.work })
                if (k == obj.cycles - 1) {
                } else {
                    array.push({ info: "rest", data: obj.rest })
                }
            }
            if (obj.sets - 1 == i) {
            } else {
                array.push({ info: "restSets", data: obj.restSets })
            }
        }
        array.push({ info: "cooldown", data: obj.cooldown })
        return array
    }
    const getInfo = (obj) => {
        let array = []
        array.push({ info: "prepare", data: obj.prepare })
        array.push({ info: "work", data: obj.work })
        array.push({ info: "rest", data: obj.rest })
        array.push({ info: "cycles", amount: obj.cycles })
        array.push({ info: "sets", amount: obj.sets })
        array.push({ info: "restSets", data: obj.restSets })
        array.push({ info: "cooldown", data: obj.cooldown })
        return array
    }
    const timerDataMapping = timerData.map((el) => {
        let info =
            el.info == "prepare"
                ? "Prepariere"
                : el.info == "work"
                ? "Trainiere"
                : el.info == "rest"
                ? "Pause"
                : el.info == "cycles"
                ? "Zyklen"
                : el.info == "sets"
                ? "Sätze"
                : el.info == "restSets"
                ? "Pause zwischen Sätze"
                : el.info == "cooldown"
                ? "Abkühlzeit"
                : ""
        let value, unit
        if (
            el.info == "prepare" ||
            el.info == "work" ||
            el.info == "rest" ||
            el.info == "restSets" ||
            el.info == "cooldown"
        ) {
            value = el.data.value
            unit = el.data.timeUnit
        } else {
            value = el.amount
            unit = "Anzahl"
        }

        return (
            <div className="tabata__page__PC__editTabata__col1__timer__item">
                <h3>{info}</h3>
                <div>
                    <h3>{value}</h3>
                    <p>{unit}</p>
                </div>
            </div>
        )
    })
    return (
        <>
            <div className="tabata__page__PC__editTabata">
                <div className="tabata__page__PC__editTabata__col1">
                    <div className="tabata__page__PC__editTabata__col1__title">
                        <ExportedImage
                            src={chevronLeft}
                            unoptimized={true}
                            alt="chevronLeft"
                            className="tabata__page__PC__editTabata__col1__title__fa__return"
                            onClick={() => {
                                setEditTimer("")
                                setShowInputTabata(true)
                                setShowTabataEdit(false)
                            }}
                        />
                        <div className="tabata__page__PC__editTabata__col1__title__edit">
                            {showEditTitle ? (
                                <input
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                ></input>
                            ) : (
                                <h2>{title == "" ? "Dein Workout" : title}</h2>
                            )}

                            <ExportedImage
                                src={pen}
                                unoptimized={true}
                                alt="editPen"
                                className="tabata__page__PC__editTabata__col1__title__fa__pen"
                                onClick={() => {
                                    setShowEditTitle((el) => {
                                        return !el
                                    })
                                }}
                            />
                        </div>
                        <div className="tabata__page__PC__editTabata__col1__title__saved">
                            {allTabatas.length !== 0 ? (
                                <p
                                    onClick={() => {
                                        setShowTabataEdit(false)
                                        setShowAllTabatas(true)
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                        })
                                    }}
                                >
                                    Siehe gespeicherte Tabatas
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div
                        className="tabata__page__PC__editTabata__col1__timer"
                        onScroll={(e) => {
                            const timerContainer = document.querySelector(
                                ".tabata__page__PC__editTabata__col1__timer"
                            )
                            const layer = document.querySelector(
                                ".tabata__page__PC__editTabata__col1__timer__boxLayer"
                            )
                            if (
                                timerContainer.scrollHeight - timerContainer.scrollTop ===
                                timerContainer.clientHeight
                            ) {
                                layer.style.opacity = "0"
                            } else {
                                layer.style.opacity = "1"
                            }
                        }}
                    >
                        {timerDataMapping}
                    </div>
                    <div className="tabata__page__PC__editTabata__col1__timer__boxLayer">
                        <div className="tabata__page__PC__editTabata__col1__timer__layer"></div>
                    </div>
                    <div className="tabata__page__PC__editTabata__col1__save">
                        {editTimer.title != title || !editTimer.uploaded ? (
                            <button
                                onClick={() => {
                                    setShowEditTitle(false)

                                    if (!editTimer.uploaded) {
                                        let titleNew =
                                            title == ""
                                                ? `Dein Workout ${allTabatas.length + 1}`
                                                : title
                                        let obj = editTimer
                                        obj.title = titleNew
                                        obj.uploaded = true
                                        obj.index = 0
                                        let array = []

                                        setEditTimer({
                                            ...editTimer,
                                            title: titleNew,
                                            uploaded: true,
                                            index: 0,
                                        })
                                        array.push(obj)
                                        for (let i = 0; i < allTabatas.length; i++) {
                                            let info = allTabatas[i]
                                            array.push({ ...info, index: i + 1 })
                                        }
                                        setAllTabatas([...array])
                                        setTitle(titleNew)
                                    } else {
                                        let obj = editTimer
                                        obj.title = title

                                        let array = allTabatas
                                        array[editTimer.index].title = title
                                        setAllTabatas([...array])
                                        setEditTimer({
                                            ...editTimer,
                                            title: title,
                                        })
                                    }
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                    })
                                }}
                            >
                                {editTimer.uploaded ? "Speicher Änderungen" : "Speicher Tabata"}
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="tabata__page__PC__editTabata__col2">
                    <div
                        className="tabata__page__PC__editTabata__col2__workLayer"
                        style={{
                            background: `conic-gradient(rgba(196, 52, 57, 0.9) ${
                                (workTime / (totalTime.minutes * 60 + totalTime.seconds)) *
                                    100 *
                                    3.6 +
                                "deg"
                            },rgba(196, 52, 57, 0.2) 0deg)`,
                        }}
                    >
                        <div className="tabata__page__PC__editTabata__col2__workLayer__hide">
                            <div
                                className="tabata__page__PC__editTabata__col2__restLayer"
                                style={{
                                    background: `conic-gradient(rgba(196, 52, 57, 0.6) ${
                                        (restTime / (totalTime.minutes * 60 + totalTime.seconds)) *
                                            100 *
                                            3.6 +
                                        "deg"
                                    },rgba(196, 52, 57, 0.2)  0deg)`,
                                }}
                            >
                                <div className="tabata__page__PC__editTabata__col2__info">
                                    <div className="tabata__page__PC__editTabata__col2__info__points">
                                        <div className="tabata__page__PC__editTabata__col2__info__minutes">
                                            <h2>{totalTime.minutes}</h2>
                                            <p>min</p>
                                        </div>
                                        <h2>:</h2>
                                        <div className="tabata__page__PC__editTabata__col2__info__seconds">
                                            <h2>{totalTime.seconds}</h2>
                                            <p>sek</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tabata__page__PC__editTabata__col2__legend">
                        <div className="tabata__page__PC__editTabata__col2__legend__work">
                            <div className="tabata__page__PC__editTabata__col2__legend__work__square"></div>
                            <p>Training</p>
                        </div>
                        <div className="tabata__page__PC__editTabata__col2__legend__rest">
                            <div className="tabata__page__PC__editTabata__col2__legend__rest__square"></div>
                            <p>Pause</p>
                        </div>
                    </div>
                    <div className="tabata__page__PC__editTabata__col2__playlist">
                        <button
                            onClick={() => {
                                setShowTabataEdit(false)
                                setShowMusic(true)
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                })
                            }}
                        >
                            {selectedPlayMusic == "" ? (
                                <>
                                    Suche eine Playlist aus{" "}
                                    <ExportedImage
                                        src={chevronLeft}
                                        unoptimized={true}
                                        alt="chevronLeft"
                                        className="tabata__page__mobile__editTabata__col2__playlist__chevron"
                                    />
                                </>
                            ) : (
                                <>
                                    <span style={{ fontWeight: "300" }}>Playlist:</span>

                                    <span style={{ marginLeft: "7px", fontWeight: "500" }}>
                                        {" "}
                                        {selectedPlayMusic.title}
                                    </span>
                                    <ExportedImage
                                        src={chevronLeft}
                                        unoptimized={true}
                                        alt="chevronLeft"
                                        className="tabata__page__mobile__editTabata__col2__playlist__chevron"
                                        onClick={() => {}}
                                    />
                                </>
                            )}
                        </button>
                    </div>
                    <div className="tabata__page__PC__editTabata__col2__play">
                        <button
                            onClick={() => {
                                enterFullScreen()
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                })
                                setShowTabataEdit(false)
                                setShowPlayTabata(true)
                            }}
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditTabataTimerPC
