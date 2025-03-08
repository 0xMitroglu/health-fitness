import React, { useState } from "react"
import chevronLeft from "../../public/chevronLeft.png"
import ExportedImage from "next-image-export-optimizer"
import pen from "../../public/pen.png"
import bin from "../../public/bin.png"
const AllTabatasMobile = (props) => {
    const {
        setShowInputTabata,
        setShowAllTabatas,
        allTabatas,
        setAllTabatas,
        editTimer,
        setEditTimer,
        setShowTabataEdit,
    } = props
    const [editTitle, setEditTitle] = useState(
        allTabatas.length
    ) /* so nobody gets edited at 1. render */
    const [showSelectTimer, setShowSelectTimer] = useState(false)
    const [selectedTimer, setSelectedTimer] = useState(allTabatas.length)
    const allTabatasMap = allTabatas.map((el, index) => {
        return (
            <div
                className="tabata__page__mobile__allTabatas__item"
                style={{ justifyContent: showSelectTimer ? "flex-start" : "space-between" }}
            >
                {showSelectTimer ? (
                    <div
                        className="tabata__page__mobile__allTabatas__item__select"
                        style={{
                            background:
                                selectedTimer == index ? "rgba(196, 52, 57, 0.9)" : "transparent",
                        }}
                        onClick={() => {
                            if (selectedTimer == index) {
                                setSelectedTimer(allTabatas.length)
                            } else {
                                setSelectedTimer(index)
                            }
                        }}
                    ></div>
                ) : (
                    ""
                )}
                {editTitle == index ? (
                    <span className="tabata__page__mobile__allTabatas__item__border">
                        <input
                            value={el.title}
                            onChange={(e) => {
                                const newTitle = e.target.value
                                let array = allTabatas
                                array[index].title = newTitle
                                setAllTabatas([...array])
                            }}
                        ></input>
                    </span>
                ) : (
                    <h2 style={{ marginLeft: showSelectTimer ? "30px" : "0px" }}>{el.title}</h2>
                )}
                {!showSelectTimer ? (
                    <div className="tabata__page__mobile__allTabatas__item__edit">
                        <ExportedImage
                            src={pen}
                            unoptimized={true}
                            alt="pen"
                            className="tabata__page__mobile__allTabatas__item__edit__image"
                            onClick={() => {
                                if (editTitle == index) {
                                    setEditTitle(allTabatas.length)
                                } else {
                                    setEditTitle(index)
                                }
                            }}
                        />{" "}
                        <ExportedImage
                            src={bin}
                            unoptimized={true}
                            alt="bin"
                            className="tabata__page__mobile__allTabatas__item__edit__image"
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
                ) : (
                    ""
                )}
            </div>
        )
    })
    return (
        <>
            <div className="tabata__page__mobile__allTabatas">
                <div className="tabata__page__mobile__allTabatas__title">
                    <ExportedImage
                        src={chevronLeft}
                        unoptimized={true}
                        alt="chevronLeft"
                        className="tabata__page__mobile__allTabatas__title__return"
                        onClick={() => {
                            setShowInputTabata(true)
                            setShowAllTabatas(false)
                        }}
                    />
                    <h2>Alle Tabatas</h2>
                </div>
                <div className="tabata__page__mobile__allTabatas__all">{allTabatasMap}</div>
                <div className="tabata__page__mobile__allTabatas__choose">
                    {showSelectTimer ? (
                        <button
                            id="tabata__page__mobile__allTabatas__choose__cancel"
                            onClick={() => {
                                setShowSelectTimer(false)
                                setSelectedTimer(allTabatas.length)
                            }}
                        >
                            Abbrechen
                        </button>
                    ) : (
                        ""
                    )}
                    <button
                        onClick={() => {
                            if (selectedTimer == allTabatas.length) {
                                setEditTitle(allTabatas.length)
                                setShowSelectTimer(true)
                            }
                            if (selectedTimer !== allTabatas.length && showSelectTimer) {
                                setEditTimer(allTabatas[selectedTimer])
                                setShowAllTabatas(false)
                                setShowTabataEdit(true)
                            }
                        }}
                    >
                        {selectedTimer !== allTabatas.length ? "Weiter" : "Auswählen"}
                    </button>
                </div>
            </div>
        </>
    )
}
export default AllTabatasMobile
