import React from "react"

const CreateTabataMobile = (props) => {
    const {
        prepareTime,
        setPrepareTime,
        prepareTimeType,
        setPrepareTimeType,
        workTime,
        workTimeType,
        setWorkTime,
        setWorkTimeType,
        restTime,
        setRestTime,
        restTimeType,
        setRestTimeType,
        cyclesAmount,
        setCyclesAmount,
        setsAmount,
        setSetsAmount,
        restSetsTime,
        setRestSetsTime,
        restSetsTimeType,
        setRestSetsTimeType,
        cooldownTime,
        setCooldownTime,
        cooldownTimeType,
        setCooldownTimeType,
        showInputTabata,
        setShowInputTabata,
        showTabataEdit,
        setShowTabataEdit,
        editTimer,
        setEditTimer,
        setShowAllTabatas,
        allTabatas,
    } = props

    const createEditTimer = () => {
        const obj = {
            title: "",
            prepare: { timeUnit: prepareTimeType, value: prepareTime },
            work: { timeUnit: workTimeType, value: workTime },
            rest: { timeUnit: restTimeType, value: restTime },
            cycles: cyclesAmount,
            sets: setsAmount,
            restSets: { timeUnit: restSetsTimeType, value: restSetsTime },
            cooldown: { timeUnit: cooldownTimeType, value: cooldownTime },
            uploaded: false,
            index: "",
        }
        setEditTimer(obj)
    }
    return (
        <>
            <div className="tabata__page__mobile__createTimer">
                <h1>Tabata Timer</h1>

                <div className="tabata__page__mobile__createTimer__box">
                    <div className="tabata__page__mobile__createTimer__col1">
                        <div className="tabata__page__mobile__createTimer__col1__prepare">
                            <h3>Prepariere</h3>
                            <input
                                type="range"
                                min="0"
                                max="60"
                                id="createTimer__prepare"
                                value={prepareTime}
                                style={{
                                    background: `linear-gradient(to right, #C4343A ${
                                        (prepareTime / 60) * 100
                                    }%, rgba(196, 52, 57, 0.4) ${(prepareTime / 60) * 100}%)`,
                                }}
                                onChange={(e) => {
                                    setPrepareTime(e.target.value)
                                }}
                            />
                            <div className="tabata__page__mobile__createTimer__col1__prepare__info">
                                <div className="tabata__page__mobile__createTimer__col1__prepare__timeSwitch">
                                    <button
                                        className={
                                            prepareTimeType == "s"
                                                ? "tabata__page__mobile__createTimer__col1__prepare__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setPrepareTimeType("s")
                                        }}
                                    >
                                        sek
                                    </button>
                                    <button
                                        className={
                                            prepareTimeType == "m"
                                                ? "tabata__page__mobile__createTimer__col1__prepare__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setPrepareTimeType("m")
                                        }}
                                    >
                                        min
                                    </button>
                                    <div
                                        className="tabata__page__mobile__createTimer__col1__prepare__info__layer"
                                        style={{
                                            left: prepareTimeType == "s" ? "0px" : "45px",
                                        }}
                                    ></div>
                                </div>
                                <div className="tabata__page__mobile__createTimer__col1__prepare__value">
                                    <input
                                        value={prepareTime}
                                        onChange={(e) => {
                                            let value = e.target.value / 1
                                            if (value >= 0 && value <= 60) {
                                                setPrepareTime(value)
                                            }
                                        }}
                                    ></input>{" "}
                                    <p>{prepareTimeType == "s" ? "sek" : "min"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tabata__page__mobile__createTimer__col1__work">
                            <h3>Trainiere</h3>
                            <input
                                type="range"
                                min="1"
                                max="60"
                                id="createTimer__work"
                                value={workTime}
                                style={{
                                    background: `linear-gradient(to right, #C4343A ${
                                        (workTime / 60) * 100
                                    }%, rgba(196, 52, 57, 0.4) ${(workTime / 60) * 100}%)`,
                                }}
                                onChange={(e) => {
                                    setWorkTime(e.target.value)
                                }}
                            />
                            <div className="tabata__page__mobile__createTimer__col1__work__info">
                                <div className="tabata__page__mobile__createTimer__col1__work__timeSwitch">
                                    <button
                                        className={
                                            workTimeType == "s"
                                                ? "tabata__page__mobile__createTimer__col1__work__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setWorkTimeType("s")
                                        }}
                                    >
                                        sek
                                    </button>
                                    <button
                                        className={
                                            workTimeType == "m"
                                                ? "tabata__page__mobile__createTimer__col1__work__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setWorkTimeType("m")
                                        }}
                                    >
                                        min
                                    </button>
                                    <div
                                        className="tabata__page__mobile__createTimer__col1__work__info__layer"
                                        style={{
                                            left: workTimeType == "s" ? "0px" : "45px",
                                        }}
                                    ></div>
                                </div>
                                <div className="tabata__page__mobile__createTimer__col1__work__value">
                                    <input
                                        value={workTime}
                                        onChange={(e) => {
                                            let value = e.target.value / 1
                                            if (value >= 0 && value <= 60) {
                                                setWorkTime(value)
                                            }
                                        }}
                                    ></input>{" "}
                                    <p>{workTimeType == "s" ? "sek" : "min"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="tabata__page__mobile__createTimer__col1__rest">
                            <h3>Pause</h3>
                            <input
                                type="range"
                                min="0"
                                max="60"
                                id="createTimer__rest"
                                value={restTime}
                                style={{
                                    background: `linear-gradient(to right, #C4343A ${
                                        (restTime / 60) * 100
                                    }%, rgba(196, 52, 57, 0.4) ${(restTime / 60) * 100}%)`,
                                }}
                                onChange={(e) => {
                                    setRestTime(e.target.value)
                                }}
                            />
                            <div className="tabata__page__mobile__createTimer__col1__rest__info">
                                <div className="tabata__page__mobile__createTimer__col1__rest__timeSwitch">
                                    <button
                                        className={
                                            restTimeType == "s"
                                                ? "tabata__page__mobile__createTimer__col1__rest__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setRestTimeType("s")
                                        }}
                                    >
                                        sek
                                    </button>
                                    <button
                                        className={
                                            restTimeType == "m"
                                                ? "tabata__page__mobile__createTimer__col1__rest__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setRestTimeType("m")
                                        }}
                                    >
                                        min
                                    </button>
                                    <div
                                        className="tabata__page__mobile__createTimer__col1__rest__info__layer"
                                        style={{
                                            left: restTimeType == "s" ? "0px" : "45px",
                                        }}
                                    ></div>
                                </div>
                                <div className="tabata__page__mobile__createTimer__col1__rest__value">
                                    <input
                                        value={restTime}
                                        onChange={(e) => {
                                            let value = e.target.value / 1
                                            if (value >= 0 && value <= 60) {
                                                setRestTime(value)
                                            }
                                        }}
                                    ></input>{" "}
                                    <p>{restTimeType == "s" ? "sek" : "min"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tabata__page__mobile__createTimer__col1__cycles">
                            <h3>Zyklen (Training + Pause)</h3>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                id="createTimer__cycles"
                                value={cyclesAmount}
                                style={{
                                    background: `linear-gradient(to right, #C4343A ${
                                        (cyclesAmount - 1) * 11
                                    }%, rgba(196, 52, 57, 0.4) ${(cyclesAmount - 1) * 11}%)`,
                                }}
                                onChange={(e) => {
                                    setCyclesAmount(e.target.value)
                                }}
                            />
                            <div className="tabata__page__mobile__createTimer__col1__cycles__info">
                                {/* FOR SPACING */} <div></div>
                                <div className="tabata__page__mobile__createTimer__col1__cycles__value">
                                    <input
                                        value={cyclesAmount}
                                        onChange={(e) => {
                                            let value = e.target.value / 1
                                            if (value > 0 && value <= 10) {
                                                setCyclesAmount(value)
                                            } else if (
                                                value.toString()[1] / 1 > 0 &&
                                                value.toString()[1] / 1 < 10
                                            ) {
                                                setCyclesAmount(value.toString()[1] / 1)
                                            }
                                        }}
                                    ></input>{" "}
                                    <p>Anzahl</p>
                                </div>
                            </div>
                        </div>
                        <div className="tabata__page__mobile__createTimer__col1__cycles">
                            <h3>Sätze (alle wiederholen)</h3>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                id="createTimer__cycles"
                                value={setsAmount}
                                style={{
                                    background: `linear-gradient(to right, #C4343A ${
                                        (setsAmount - 1) * 11
                                    }%, rgba(196, 52, 57, 0.4) ${(setsAmount - 1) * 11}%)`,
                                }}
                                onChange={(e) => {
                                    setSetsAmount(e.target.value)
                                }}
                            />
                            <div className="tabata__page__mobile__createTimer__col1__cycles__info">
                                {/* FOR SPACING */} <div></div>
                                <div className="tabata__page__mobile__createTimer__col1__cycles__value">
                                    <input
                                        value={setsAmount}
                                        onChange={(e) => {
                                            let value = e.target.value / 1
                                            if (value > 0 && value <= 10) {
                                                setSetsAmount(value)
                                            } else if (
                                                value.toString()[1] / 1 > 0 &&
                                                value.toString()[1] / 1 < 10
                                            ) {
                                                setSetsAmount(value.toString()[1] / 1)
                                            }
                                        }}
                                    ></input>{" "}
                                    <p>Anzahl</p>
                                </div>
                            </div>
                        </div>
                        <div className="tabata__page__mobile__createTimer__col1__restSets">
                            <h3>Pause zwischen Sätze</h3>
                            <input
                                type="range"
                                min="0"
                                max="60"
                                id="createTimer__restSets"
                                value={restSetsTime}
                                style={{
                                    background: `linear-gradient(to right, #C4343A ${
                                        (restSetsTime / 60) * 100
                                    }%, rgba(196, 52, 57, 0.4) ${(restSetsTime / 60) * 100}%)`,
                                }}
                                onChange={(e) => {
                                    setRestSetsTime(e.target.value)
                                }}
                            />
                            <div className="tabata__page__mobile__createTimer__col1__restSets__info">
                                <div className="tabata__page__mobile__createTimer__col1__restSets__timeSwitch">
                                    <button
                                        className={
                                            restSetsTimeType == "s"
                                                ? "tabata__page__mobile__createTimer__col1__restSets__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setRestSetsTimeType("s")
                                        }}
                                    >
                                        sek
                                    </button>
                                    <button
                                        className={
                                            restSetsTimeType == "m"
                                                ? "tabata__page__mobile__createTimer__col1__restSets__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setRestSetsTimeType("m")
                                        }}
                                    >
                                        min
                                    </button>
                                    <div
                                        className="tabata__page__mobile__createTimer__col1__restSets__info__layer"
                                        style={{
                                            left: restSetsTimeType == "s" ? "0px" : "45px",
                                        }}
                                    ></div>
                                </div>
                                <div className="tabata__page__mobile__createTimer__col1__restSets__value">
                                    <input
                                        value={restSetsTime}
                                        onChange={(e) => {
                                            let value = e.target.value / 1
                                            if (value >= 0 && value <= 60) {
                                                setRestSetsTime(value)
                                            }
                                        }}
                                    ></input>{" "}
                                    <p>{restSetsTimeType == "s" ? "sek" : "min"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tabata__page__mobile__createTimer__col1__cooldown">
                            <h3>Abkühlzeit</h3>
                            <input
                                type="range"
                                min="0"
                                max="60"
                                id="createTimer__cooldown"
                                value={cooldownTime}
                                style={{
                                    background: `linear-gradient(to right, #C4343A ${
                                        (cooldownTime / 60) * 100
                                    }%, rgba(196, 52, 57, 0.4) ${(cooldownTime / 60) * 100}%)`,
                                }}
                                onChange={(e) => {
                                    setCooldownTime(e.target.value)
                                }}
                            />
                            <div className="tabata__page__mobile__createTimer__col1__cooldown__info">
                                <div className="tabata__page__mobile__createTimer__col1__cooldown__timeSwitch">
                                    <button
                                        className={
                                            cooldownTimeType == "s"
                                                ? "tabata__page__mobile__createTimer__col1__cooldown__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setCooldownTimeType("s")
                                        }}
                                    >
                                        sek
                                    </button>
                                    <button
                                        className={
                                            cooldownTimeType == "m"
                                                ? "tabata__page__mobile__createTimer__col1__cooldown__timeSwitch__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setCooldownTimeType("m")
                                        }}
                                    >
                                        min
                                    </button>
                                    <div
                                        className="tabata__page__mobile__createTimer__col1__cooldown__info__layer"
                                        style={{
                                            left: cooldownTimeType == "s" ? "0px" : "45px",
                                        }}
                                    ></div>
                                </div>
                                <div className="tabata__page__mobile__createTimer__col1__cooldown__value">
                                    <input
                                        value={cooldownTime}
                                        onChange={(e) => {
                                            let value = e.target.value / 1
                                            if (value >= 0 && value <= 60) {
                                                setCooldownTime(value)
                                            }
                                        }}
                                    ></input>{" "}
                                    <p>{cooldownTimeType == "s" ? "sek" : "min"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tabata__page__mobile__createTimer__col2__buttons">
                            <div className="tabata__page__mobile__createTimer__col2__buttons__box">
                                {allTabatas.length !== 0 ? (
                                    <button
                                        onClick={() => {
                                            setShowInputTabata(false)
                                            setShowAllTabatas(true)
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                            })
                                        }}
                                    >
                                        Alle Tabatas
                                    </button>
                                ) : (
                                    ""
                                )}
                                <button
                                    onClick={() => {
                                        createEditTimer()
                                        setShowInputTabata(false)
                                        setShowTabataEdit(true)
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                        })
                                    }}
                                    id="tabata__page__mobile__createTimer__col2__buttons__box__continue"
                                >
                                    Weiter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateTabataMobile
