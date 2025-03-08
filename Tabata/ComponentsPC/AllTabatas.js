import React from "react"
import { useEffect, useState } from "react"
import ExportedImage from "next-image-export-optimizer"
import chevronLeft from "../../public/chevronLeft.png"
import chevronRightBig from "../../public/chevronRightBig.png"
import pen from "../../public/pen.png"
import bin from "../../public/bin.png"
const AllTabatas = (props) => {
    const {
        setShowInputTabata,
        setShowAllTabatas,
        allTabatas,
        setAllTabatas,
        editTimer,
        setEditTimer,
        setShowTabataEdit,
    } = props
    const [viewTabataNumber, setViewTabataNumber] = useState([0, 1])
    const [showEditTitle, setShowEditTitle] =
        useState(null) /* if index then we show that index input */
    const [newTitle, setNewTitle] = useState("")
    useEffect(() => {
        if (allTabatas.length == 0) {
            setShowInputTabata(true)
            setShowAllTabatas(false)
        }
    }, [allTabatas.length])
    useEffect(() => {
        const chevronLeftImage = document.querySelector(
            ".tabata__page__PC__allTabatas__tabatas__chevronLeft"
        )
        if ((viewTabataNumber[0] == 0 && viewTabataNumber[1] == 1) || allTabatas.length == 0) {
            chevronLeftImage.style.opacity = "0"
            chevronLeftImage.style.left = "-20px"
        } else {
            chevronLeftImage.style.opacity = "1"
            chevronLeftImage.style.left = "-40px"
        }
        const chevronRightImage = document.querySelector(
            ".tabata__page__PC__allTabatas__tabatas__chevronRight"
        )
        if (
            viewTabataNumber[0] == allTabatas.length - 1 ||
            viewTabataNumber[1] == allTabatas.length - 1 ||
            allTabatas.length == 0
        ) {
            chevronRightImage.style.opacity = "0"
            chevronRightImage.style.right = "-20px"
        } else {
            chevronRightImage.style.opacity = "1"
            chevronRightImage.style.right = "-40px"
        }
    }, [viewTabataNumber, allTabatas.length])
    const allTabatasMapping = allTabatas.map((el, index) => {
        return (
            <>
                <div className="tabata__page__PC__allTabatas__tabata" key={index}>
                    <div className="tabata__page__PC__allTabatas__tabata__title">
                        {showEditTitle == index ? (
                            <input
                                value={newTitle}
                                onChange={(e) => {
                                    setNewTitle(e.target.value)
                                }}
                            ></input>
                        ) : (
                            <h3 className="tabata__page__PC__allTabatas__tabata__title__h3">
                                {el.title}
                            </h3>
                        )}
                        <div className="tabata__page__PC__allTabatas__tabata__title__fas">
                            <ExportedImage
                                src={pen}
                                unoptimized={true}
                                alt="pen"
                                className="tabata__page__PC__allTabatas__tabata__title__pen"
                                onClick={() => {
                                    if (showEditTitle == index && newTitle == el.title) {
                                        setShowEditTitle(null)
                                        setNewTitle("")
                                    } else if (showEditTitle == index && newTitle !== el.title) {
                                        setShowEditTitle(null)
                                        setNewTitle("")
                                    } else {
                                        setShowEditTitle(index)
                                        setNewTitle(el.title)
                                    }
                                }}
                            />{" "}
                            <ExportedImage
                                src={bin}
                                unoptimized={true}
                                alt="bin"
                                className="tabata__page__PC__allTabatas__tabata__title__bin"
                                onClick={() => {
                                    const isConfirmed = window.confirm(
                                        "Sind Sie sicher, dass Sie Ihren Tabata-Timer löschen möchten?"
                                    )

                                    if (isConfirmed) {
                                        let array = []
                                        for (let i = 0; i < allTabatas.length; i++) {
                                            if (i == index) {
                                            } else {
                                                array.push(allTabatas[i])
                                            }
                                        }
                                        setAllTabatas([...array])
                                        setSelectedTimer(array.length)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div
                        className="tabata__page__PC__allTabatas__tabata__box"
                        onScroll={(e) => {
                            const timerContainer = document.querySelectorAll(
                                ".tabata__page__PC__allTabatas__tabata__box"
                            )
                            const layer = document.querySelectorAll(
                                ".tabata__page__PC__editTabata__col1__timer__boxLayer"
                            )
                            if (
                                parseInt(
                                    parseInt(
                                        timerContainer[index].scrollHeight -
                                            timerContainer[index].scrollTop
                                    )
                                ) == timerContainer[index].clientHeight
                            ) {
                                layer[index].style.opacity = "0"
                            } else {
                                layer[index].style.opacity = "1"
                            }
                        }}
                    >
                        <div className="tabata__page__PC__allTabatas__tabata__box__item">
                            <h3>Prepariere</h3>
                            <div>
                                <h3>{el.prepare.value}</h3>
                                <p>{el.prepare.timeUnit == "s" ? "sek" : "min"}</p>
                            </div>
                        </div>
                        <div className="tabata__page__PC__allTabatas__tabata__box__item">
                            <h3>Trainiere</h3>
                            <div>
                                <h3>{el.work.value}</h3>
                                <p>{el.work.timeUnit == "s" ? "sek" : "min"}</p>
                            </div>
                        </div>
                        <div className="tabata__page__PC__allTabatas__tabata__box__item">
                            <h3>Pause</h3>
                            <div>
                                <h3>{el.rest.value}</h3>
                                <p>{el.rest.timeUnit == "s" ? "sek" : "min"}</p>
                            </div>
                        </div>
                        <div className="tabata__page__PC__allTabatas__tabata__box__item">
                            <h3>Zyklen</h3>
                            <div>
                                <h3>{el.cycles}</h3>
                                <p>Anzahl</p>
                            </div>
                        </div>
                        <div className="tabata__page__PC__allTabatas__tabata__box__item">
                            <h3>Sätze</h3>
                            <div>
                                <h3>{el.sets}</h3>
                                <p>Anzahl</p>
                            </div>
                        </div>
                        <div className="tabata__page__PC__allTabatas__tabata__box__item">
                            <h3>Pause zwischen Sätze</h3>
                            <div>
                                <h3>{el.restSets.value}</h3>
                                <p>{el.restSets.timeUnit == "s" ? "sek" : "min"}</p>
                            </div>
                        </div>
                        <div className="tabata__page__PC__allTabatas__tabata__box__item">
                            <h3>Abkühlzeit</h3>
                            <div>
                                <h3>{el.cooldown.value}</h3>
                                <p>{el.cooldown.timeUnit == "s" ? "sek" : "min"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="tabata__page__PC__editTabata__col1__timer__boxLayer">
                        <div className="tabata__page__PC__editTabata__col1__timer__layer"></div>
                    </div>
                    <div className="tabata__page__PC__allTabatas__tabata__button">
                        {el.title == newTitle || showEditTitle !== index ? (
                            <button
                                onClick={() => {
                                    setEditTimer(el)
                                    setShowAllTabatas(false)
                                    setShowTabataEdit(true)
                                }}
                            >
                                Auswählen
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    let array = allTabatas
                                    array[index].title = newTitle
                                    setAllTabatas([...array])
                                    setShowEditTitle(null)
                                }}
                            >
                                Änderungen speichern
                            </button>
                        )}
                    </div>
                </div>
            </>
        )
    })
    return (
        <div className="tabata__page__PC__allTabatas">
            <div className="tabata__page__PC__allTabatas__title">
                <h1
                    onClick={() => {
                        setShowInputTabata(true)
                        setShowAllTabatas(false)
                    }}
                >
                    Alle Tabatas
                </h1>
                <ExportedImage
                    src={chevronLeft}
                    unoptimized={true}
                    alt="chevronLeft"
                    className="tabata__page__PC__allTabatas__title__chevronLeft"
                    onClick={() => {
                        setShowInputTabata(true)
                        setShowAllTabatas(false)
                    }}
                />
            </div>
            <div className="tabata__page__PC__allTabatas__tabatas__boxOverall">
                <div className="tabata__page__PC__allTabatas__tabatas">
                    <div className="tabata__page__PC__allTabatas__tabatas__box">
                        {allTabatasMapping}
                    </div>
                </div>
                <ExportedImage
                    src={chevronRightBig}
                    unoptimized={true}
                    alt="chevronRight"
                    className="tabata__page__PC__allTabatas__tabatas__chevronRight"
                    style={{ display: allTabatas.length < 3 ? "none" : "flex" }}
                    onClick={() => {
                        const box = document.querySelector(
                            ".tabata__page__PC__allTabatas__tabatas__box"
                        )
                        if (
                            viewTabataNumber[0] == allTabatas.length - 1 ||
                            viewTabataNumber[1] == allTabatas.length - 1
                        ) {
                        } else {
                            let old = viewTabataNumber
                            setViewTabataNumber((el) => {
                                return [el[0] + 2, el[1] + 2]
                            })
                            box.style.left = `${parseInt((old[0] + 2) / 2) * -110}%`
                        }
                    }}
                />
                <ExportedImage
                    src={chevronRightBig}
                    unoptimized={true}
                    alt="chevronLeft"
                    className="tabata__page__PC__allTabatas__tabatas__chevronLeft"
                    onClick={() => {
                        const box = document.querySelector(
                            ".tabata__page__PC__allTabatas__tabatas__box"
                        )
                        if (viewTabataNumber[0] == 0 && viewTabataNumber[1] == 1) {
                        } else {
                            let old = viewTabataNumber
                            setViewTabataNumber((el) => {
                                return [el[0] - 2, el[1] - 2]
                            })
                            box.style.left = `${parseInt((old[0] - 2) / 2) * -110}%`
                        }
                    }}
                />
            </div>
        </div>
    )
}
export default AllTabatas
