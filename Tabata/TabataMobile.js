import React from "react"
import CreateTabataMobile from "./ComponentsMobile/CreateTabataMobile"
import Footer from "@/hooks/Footer"
import EditTabataTimerMobile from "./ComponentsMobile/EditTabataTimerMobile"
import AllTabatasMobile from "./ComponentsMobile/AllTabatasMobile"
import MusicTabataMobile from "./ComponentsMobile/MusicTabataMobile"
import { useState } from "react"
import PlayTabataMobile from "./ComponentsMobile/PlayTabataMobile"
const TabataMobile = (props) => {
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
        allTabatas,
        setAllTabatas,
        showAllTabatas,
        setShowAllTabatas,
        showPlayTabata,
        setShowPlayTabata,
        setShowMusic,
        showMusic,
        allPlaylists,
        setAllPlaylists,
        selectedPlayMusic,
        setSelectedPlayMusic,
        windowWidth,
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
    const [showPlay, setShowPlay] = useState(false)
    return (
        <>
            <div className="tabata__page__mobile page">
                <div className="tabata__page__mobile__row">
                    {showInputTabata ? (
                        <CreateTabataMobile
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
                            setShowAllTabatas={setShowAllTabatas}
                            allTabatas={allTabatas}
                        />
                    ) : (
                        ""
                    )}
                    {showTabataEdit ? (
                        <EditTabataTimerMobile
                            editTimer={editTimer}
                            setEditTimer={setEditTimer}
                            setAllTabatas={setAllTabatas}
                            allTabatas={allTabatas}
                            setShowInputTabata={setShowInputTabata}
                            setShowTabataEdit={setShowTabataEdit}
                            setShowAllTabatas={setShowAllTabatas}
                            showPlayTabata={showPlayTabata}
                            setShowPlayTabata={setShowPlayTabata}
                            setShowMusic={setShowMusic}
                            showMusic={showMusic}
                            selectedPlayMusic={selectedPlayMusic}
                            setSelectedPlayMusic={setSelectedPlayMusic}
                            showPlay={showPlay}
                            setShowPlay={setShowPlay}
                        />
                    ) : (
                        ""
                    )}
                    {showAllTabatas ? (
                        <AllTabatasMobile
                            setShowInputTabata={setShowInputTabata}
                            allTabatas={allTabatas}
                            setAllTabatas={setAllTabatas}
                            setShowAllTabatas={setShowAllTabatas}
                            editTimer={editTimer}
                            setEditTimer={setEditTimer}
                            setShowTabataEdit={setShowTabataEdit}
                            selectedPlayMusic={selectedPlayMusic}
                            setSelectedPlayMusic={setSelectedPlayMusic}
                        />
                    ) : (
                        ""
                    )}
                    {showMusic ? (
                        <MusicTabataMobile
                            setShowMusic={setShowMusic}
                            setShowTabataEdit={setShowTabataEdit}
                            allPlaylists={allPlaylists}
                            setAllPlaylists={setAllPlaylists}
                            selectedPlayMusic={selectedPlayMusic}
                            setSelectedPlayMusic={setSelectedPlayMusic}
                            showTabataEdit={showTabataEdit}
                        />
                    ) : (
                        ""
                    )}
                    {showPlayTabata && windowWidth < 1000 ? (
                        <PlayTabataMobile
                            showPlayTabata={showPlayTabata}
                            setShowPlayTabata={setShowPlayTabata}
                            setShowTabataEdit={setShowTabataEdit}
                            editTimer={editTimer}
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
                        />
                    ) : (
                        ""
                    )}
                </div>
                {showPlayTabata ? "" : <Footer />}
            </div>
        </>
    )
}
export default TabataMobile
