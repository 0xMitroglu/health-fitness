import React, { useEffect, useState } from "react"
import ExportedImage from "next-image-export-optimizer"
import chevronLeft from "../../public/chevronLeft.png"
import data from "../MusicData.json"
import lemonTreeCover from "../../public/music/images/lemonTreeCover.jpg"
import victoryCover from "../../public/music/images/victoryCover.jpg"
import faceOffCover from "../../public/music/images/faceOffCover.jpg"
import addImage from "../../public/add.png"
import removeImage from "../../public/remove.png"
import hipsCover from "../../public/music/images/hipsCover.jpeg"
import canYouHearMusicCover from "../../public/music/images/canYouHearMusicCover.jpg"
import pen from "../../public/pen.png"
import bin from "../../public/bin.png"
import xMark from "../../public/xMark.png"
import play from "../../public/play.png"
import tonCombatCover from "../../public/music/images/tonCombatCover.jpg"
const MusicTabata = (props) => {
    const music = data.allMusic

    const {
        setShowMusic,
        setShowTabataEdit,
        allPlaylists,
        setAllPlaylists,
        selectedPlayMusic,
        setSelectedPlayMusic,
        showTabataEdit,
    } = props
    const [showCreate, setShowCreate] = useState(true)
    const [selectedMusic, setSelectedMusic] = useState([])
    const [editTitle, setEditTitle] = useState(false)
    const [title, setTitle] = useState("")
    const [editPaylist, setEditPlaylist] = useState(false)
    const [deletePlaylist, setDeletePlaylist] = useState(false)
    useEffect(() => {
        if (allPlaylists.length == 0) {
            setDeletePlaylist(false)
            setEditPlaylist(false)
        }
    }, [allPlaylists])
    useEffect(() => {
        setDeletePlaylist(false)
        setEditPlaylist(false)
    }, [showCreate])
    useEffect(() => {
        setShowCreate(true)
    }, [showTabataEdit])
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
    const getInfo = (title) => {
        for (let i = 0; i < music.length; i++) {
            if (music[i].title == title) {
                return music[i]
            }
        }
    }
    const coverImages = [0, 1, 2, 3].map((el) => {
        return (
            <div className="tabata__page__PC__music__col2__coverImages__image">
                {selectedMusic.length >= el + 1 ? (
                    <ExportedImage
                        src={getImage(getInfo(selectedMusic[el]).imageLink)}
                        unoptimized={true}
                        alt="image"
                        onClick={() => {
                            setShowMusic(false)
                            setShowTabataEdit(true)
                        }}
                    />
                ) : (
                    ""
                )}
            </div>
        )
    })
    const musicSelect = music.map((el) => {
        let selected = false
        for (let i = 0; i < selectedMusic.length; i++) {
            if (selectedMusic[i] == el.title) {
                selected = true
            }
        }

        return (
            <div className="tabata__page__PC__music__col1__songs__item">
                <ExportedImage
                    src={getImage(el.imageLink)}
                    unoptimized={true}
                    alt="image"
                    onClick={() => {
                        setShowMusic(false)
                        setShowTabataEdit(true)
                    }}
                />
                <div className="tabata__page__PC__music__col1__songs__text">
                    <div className="tabata__page__PC__music__col1__songs__text__col1">
                        <h3>{el.title}</h3>
                        <p>{el.artist}</p>
                    </div>{" "}
                    <div className="tabata__page__PC__music__col1__songs__text__col2">
                        <ExportedImage
                            src={selected ? removeImage : addImage}
                            unoptimized={true}
                            alt="image"
                            onClick={() => {
                                let found = false
                                for (let i = 0; i < selectedMusic.length; i++) {
                                    if (selectedMusic[i] == el.title) {
                                        found = true
                                    }
                                }
                                if (found) {
                                    let array = []
                                    for (let i = 0; i < selectedMusic.length; i++) {
                                        if (selectedMusic[i] == el.title) {
                                        } else {
                                            array.push(selectedMusic[i])
                                        }
                                    }
                                    setSelectedMusic(array)
                                } else {
                                    let array = [...selectedMusic]
                                    array.push(el.title)
                                    setSelectedMusic(array)
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    })
    const selectedMusicMap = selectedMusic.map((el) => {
        return (
            <div className="tabata__page__PC__music__col2__title__selectedMusic__item">
                <ExportedImage
                    src={getImage(getInfo(el).imageLink)}
                    unoptimized={true}
                    alt="image"
                    onClick={() => {
                        setShowMusic(false)
                        setShowTabataEdit(true)
                    }}
                />
                <div className="tabata__page__PC__music__col2__title__selectedMusic__item__text">
                    <div className="tabata__page__PC__music__col2__title__selectedMusic__item__text__col1">
                        <h2>{getInfo(el).title}</h2>
                        <p>{getInfo(el).artist}</p>
                    </div>
                    <div className="tabata__page__PC__music__col2__title__selectedMusic__item__text__col2">
                        <h2>{getInfo(el).duration}</h2>
                    </div>
                </div>
            </div>
        )
    })

    const allPlaylistsMap = allPlaylists.map((el, index) => {
        const coverPlaylist = [0, 1, 2, 3].map((element) => {
            return (
                <>
                    {el.songs.length >= element + 1 ? (
                        <ExportedImage
                            src={getImage(getInfo(el.songs[element]).imageLink)}
                            unoptimized={true}
                            alt="image"
                            onClick={() => {
                                setShowMusic(false)
                                setShowTabataEdit(true)
                            }}
                        />
                    ) : (
                        ""
                    )}
                </>
            )
        })
        return (
            <div className="tabata__page__PC__music__allMusic__playlist" key={index}>
                <div className="tabata__page__PC__music__allMusic__playlist__cover">
                    {coverPlaylist}
                </div>
                <div className="tabata__page__PC__music__allMusic__playlist__text">
                    {editPaylist ? (
                        <input
                            value={el.title}
                            onChange={(e) => {
                                let array = allPlaylists
                                let newTitle = e.target.value

                                array[index].title = newTitle
                                setAllPlaylists([...array])
                            }}
                        ></input>
                    ) : (
                        <h2>{el.title}</h2>
                    )}
                    <p>{el.songs.length} Songs</p>
                </div>
                {deletePlaylist ? (
                    <div className="tabata__page__PC__music__allMusic__playlist__edit">
                        <ExportedImage
                            src={bin}
                            unoptimized={true}
                            alt="chevronLeft"
                            onClick={() => {
                                let array = []
                                for (let i = 0; i < allPlaylists.length; i++) {
                                    if (i == index) {
                                    } else {
                                        array.push(allPlaylists[i])
                                    }
                                }
                                setAllPlaylists([...array])
                            }}
                        />
                    </div>
                ) : !editPaylist && !deletePlaylist ? (
                    <div className="tabata__page__PC__music__allMusic__playlist__edit">
                        <ExportedImage
                            src={play}
                            unoptimized={true}
                            alt="chevronLeft"
                            className="tabata__page__PC__music__allMusic__playlist__edit__play"
                            onClick={() => {
                                setSelectedPlayMusic({ ...el })
                                setShowMusic(false)
                                setShowTabataEdit(true)
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                })
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
            <div className="tabata__page__PC__music">
                <div
                    className={
                        showCreate
                            ? "tabata__page__PC__music__col1"
                            : "tabata__page__PC__music__allMusic"
                    }
                >
                    <div className="tabata__page__PC__music__col1__title">
                        <ExportedImage
                            src={chevronLeft}
                            unoptimized={true}
                            alt="chevronLeft"
                            className="tabata__page__PC__music__col1__chevronLeft"
                            onClick={() => {
                                setShowMusic(false)
                                setShowTabataEdit(true)
                            }}
                        />
                        <h1>Musik</h1>
                    </div>
                    <div className="tabata__page__PC__music__col1__title__buttons">
                        <div
                            className="tabata__page__PC__music__col1__title__buttons__layer"
                            style={{ left: showCreate ? "0" : "110px" }}
                        ></div>
                        <button
                            style={{ color: showCreate ? "white" : "black" }}
                            onClick={() => {
                                setShowCreate(true)
                            }}
                        >
                            Erstelle
                        </button>
                        <button
                            style={{ color: !showCreate ? "white" : "black" }}
                            onClick={() => {
                                setShowCreate(false)
                            }}
                        >
                            Playlists
                        </button>
                    </div>
                    {showCreate ? (
                        <div className="tabata__page__PC__music__col1__songs">
                            <h2>Wähle Songs für deine Playlist aus</h2>
                            <div className="tabata__page__PC__music__col1__songs__box">
                                {musicSelect}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="tabata__page__PC__music__allMusic__edit">
                                {" "}
                                {(editPaylist || deletePlaylist) && allPlaylists.length !== 0 ? (
                                    <ExportedImage
                                        src={xMark}
                                        unoptimized={true}
                                        alt="pen"
                                        className="tabata__page__PC__music__allMusic__edit__fa"
                                        onClick={() => {
                                            setDeletePlaylist(false)
                                            setEditPlaylist(false)
                                        }}
                                    />
                                ) : (
                                    <>
                                        <ExportedImage
                                            src={pen}
                                            unoptimized={true}
                                            alt="pen"
                                            className="tabata__page__PC__music__allMusic__edit__fa"
                                            onClick={() => {
                                                if (allPlaylists.length !== 0) {
                                                    setEditPlaylist(true)
                                                }
                                            }}
                                        />
                                        <ExportedImage
                                            src={bin}
                                            unoptimized={true}
                                            alt="pen"
                                            className="tabata__page__PC__music__allMusic__edit__fa"
                                            onClick={() => {
                                                if (allPlaylists.length !== 0) {
                                                    setDeletePlaylist(true)
                                                }
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                            <div className="tabata__page__PC__music__allMusic__playlists">
                                {allPlaylists.length == 0 ? (
                                    <h3>Noch keine Playlist</h3>
                                ) : (
                                    allPlaylistsMap
                                )}
                            </div>
                        </>
                    )}
                </div>
                {showCreate ? (
                    <div className="tabata__page__PC__music__col2">
                        <div className="tabata__page__PC__music__col2__coverImages">
                            {coverImages}
                        </div>
                        <div className="tabata__page__PC__music__col2__title">
                            {editTitle ? (
                                <input
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                ></input>
                            ) : (
                                <h3>{title == "" ? "Playlist Name" : title}</h3>
                            )}
                            <ExportedImage
                                src={pen}
                                unoptimized={true}
                                alt="pen"
                                className="tabata__page__PC__music__col2__title__pen"
                                onClick={() => {
                                    setEditTitle(!editTitle)
                                }}
                            />
                        </div>
                        <div className="tabata__page__PC__music__col2__title__selectedMusic">
                            {selectedMusicMap}
                        </div>
                        {selectedMusic.length !== 0 ? (
                            <button
                                className="tabata__page__PC__music__col2__button"
                                onClick={() => {
                                    let titleNew, songs
                                    if (title == "") {
                                        titleNew = `Playlist ${allPlaylists.length + 1}`
                                    } else {
                                        titleNew = title
                                    }
                                    songs = selectedMusic
                                    let obj = { title: titleNew, songs: selectedMusic }
                                    let array = [obj]
                                    for (let i = 0; i < allPlaylists.length; i++) {
                                        array.push(allPlaylists[i])
                                    }

                                    setAllPlaylists([...array])
                                    setSelectedMusic([])
                                    setTitle("")
                                    setShowCreate(false)
                                    setEditTitle(false)
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                    })
                                }}
                            >
                                Speicher Playlist
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    )
}
export default MusicTabata
