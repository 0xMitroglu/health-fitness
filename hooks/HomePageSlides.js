import React, { useState, useEffect } from "react"
import ExportedImage from "next-image-export-optimizer"
/* Gifs */
import video1 from "../public/videos/1.jpg"
import video2 from "../public/videos/2.jpg"
import video3 from "../public/videos/3.jpg"
import video4 from "../public/videos/4.jpg"
import video5 from "../public/videos/5.jpg"
const HomePageSlides = () => {
    const [showSlideNumber, setShowSlideNumber] = useState(1)
    const [mobile, setMobile] = useState(true)
    useEffect(() => {
        const interval = setInterval(() => {
            setShowSlideNumber((prev) => {
                if (prev === 5) {
                    return 1
                } else {
                    return prev + 1
                }
            })
        }, 10000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        const mobileKeywords = [
            "android",
            "webos",
            "iphone",
            "ipad",
            "ipod",
            "blackberry",
            "windows phone",
        ]

        setMobile(mobileKeywords.some((keyword) => userAgent.includes(keyword)))
    }, [])
    useEffect(() => {
        if (mobile) {
            const video1 = document.querySelector("#video4")
            video1.style.left = "0"
            video1.style.opacity = "0"
            const video = document.querySelector("#video3")
            video.style.left = "0"
            video.style.opacity = "0"

            const video3 = document.querySelector("#video5")
            video3.style.left = "99"
            video3.style.opacity = "0"
            const video4 = document.querySelector("#video2")
            video4.style.left = "99"
            video4.style.opacity = "0"
            const video5 = document.querySelector("#video1")
            video5.style.left = "99"
            video5.style.opacity = "0"
        } else {
            if (showSlideNumber == 1) {
                const video1 = document.querySelector("#video4")
                video1.style.left = "0"
                video1.style.opacity = "1"

                const video2 = document.querySelector("#video3")
                video2.style.left = "0"
                video2.style.opacity = "0"

                const video3 = document.querySelector("#video5")
                video3.style.left = "99"
                video3.style.opacity = "0"
                const video4 = document.querySelector("#video2")
                video4.style.left = "99"
                video4.style.opacity = "0"
                const video5 = document.querySelector("#video1")
                video5.style.left = "99"
                video5.style.opacity = "0"
            } else if (showSlideNumber == 2) {
                const video1 = document.querySelector("#video4")
                video1.style.left = "0"
                video1.style.opacity = "0"

                const video2 = document.querySelector("#video3")
                video2.style.left = "0"
                video2.style.opacity = "1"

                const video3 = document.querySelector("#video5")
                video3.style.left = "99"
                video3.style.opacity = "0"
                const video4 = document.querySelector("#video2")
                video4.style.left = "99"
                video4.style.opacity = "0"
                const video5 = document.querySelector("#video1")
                video5.style.left = "99"
                video5.style.opacity = "0"
            } else if (showSlideNumber == 3) {
                const video1 = document.querySelector("#video4")
                video1.style.left = "0"
                video1.style.opacity = "0"

                const video2 = document.querySelector("#video3")
                video2.style.left = "99"
                video2.style.opacity = "0"

                const video3 = document.querySelector("#video5")
                video3.style.left = "0"
                video3.style.opacity = "1"
                const video4 = document.querySelector("#video2")
                video4.style.left = "99"
                video4.style.opacity = "0"
                const video5 = document.querySelector("#video1")
                video5.style.left = "99"
                video5.style.opacity = "0"
            } else if (showSlideNumber == 4) {
                const video1 = document.querySelector("#video4")
                video1.style.left = "0"
                video1.style.opacity = "0"

                const video2 = document.querySelector("#video3")
                video2.style.left = "99"
                video2.style.opacity = "0"

                const video3 = document.querySelector("#video5")
                video3.style.left = "99"
                video3.style.opacity = "0"

                const video4 = document.querySelector("#video2")
                video4.style.left = "0"
                video4.style.opacity = "1"
                const video5 = document.querySelector("#video1")
                video5.style.left = "99"
                video5.style.opacity = "0"
            } else if (showSlideNumber == 5) {
                const video1 = document.querySelector("#video4")
                video1.style.left = "0"
                video1.style.opacity = "0"

                const video2 = document.querySelector("#video3")
                video2.style.left = "99"
                video2.style.opacity = "0"

                const video3 = document.querySelector("#video5")
                video3.style.left = "99"
                video3.style.opacity = "0"

                const video4 = document.querySelector("#video2")
                video4.style.left = "99"
                video4.style.opacity = "0"
                const video5 = document.querySelector("#video1")
                video5.style.left = "0"
                video5.style.opacity = "1"
            }
        }
    }, [showSlideNumber, mobile])
    return (
        <div className="home__slides">
            <div className="home__slide slide1">
                <div className="home__slide__pc" id="video4">
                    <video
                        src="/videos/video4.mp4"
                        loop
                        muted
                        playsInline
                        autoPlay
                        className="video"
                    />
                    <div className="home__slide__text">
                        <h1>Stärke entfesseln</h1>
                        <div className="home__slide__text__box"></div>
                        <p>
                            Entdecke die Kraft in dir und entfalte dein volles Potenzial. Unsere
                            Fitnessprogramme helfen dir dabei, Stärke, Ausdauer und deine
                            Fitnessziele zu erreichen.
                        </p>
                        <button>Starte deine Reise</button>
                    </div>
                    <div className="layer"></div>
                </div>
                {mobile && showSlideNumber == 1 ? (
                    <>
                        {" "}
                        <ExportedImage
                            src={video4}
                            alt="Orginal, unoptimized image"
                            width="200"
                            height="200"
                            unoptimized={true}
                            id="image1"
                        />
                        <div className="home__slide__text">
                            <h1>Stärke entfesseln</h1>
                            <p>
                                Entdecke die Kraft in dir und entfalte dein volles Potenzial.
                                Unsere Fitnessprogramme helfen dir dabei, Stärke, Ausdauer und
                                deine Fitnessziele zu erreichen.
                            </p>
                            <button>Starte deine Reise</button>
                        </div>
                        <div className="layer"></div>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className="home__slide slide2">
                <div className="home__slide__pc" id="video3">
                    <video
                        src="/videos/video3.mp4"
                        loop
                        muted
                        playsInline
                        autoPlay
                        className="video"
                    />
                    <div className="home__slide__text">
                        <h1>Überwinde deine Grenzen</h1>
                        <p>
                            Fordere dich heraus, gehe über deine Komfortzone hinaus und überwinde
                            deine Ängste. Wir bieten eine unterstützende Umgebung, in der du
                            Hindernisse bewältigen und dein wahres Potenzial entdecken kannst.{" "}
                        </p>
                        <button>Nimm die Herausforderung an</button>
                    </div>
                    <div className="layer"></div>
                </div>
                {mobile && showSlideNumber == 2 ? (
                    <>
                        <ExportedImage
                            src={video3}
                            alt="Orginal, unoptimized image"
                            width="200"
                            height="200"
                            unoptimized={true}
                            id="image2"
                        />
                        <div className="home__slide__text">
                            <h1>Überwinde deine Grenzen</h1>
                            <p>
                                Fordere dich heraus, gehe über deine Komfortzone hinaus und
                                überwinde deine Ängste. Wir bieten eine unterstützende Umgebung, in
                                der du Hindernisse bewältigen und dein wahres Potenzial entdecken
                                kannst.{" "}
                            </p>
                            <button>Nimm die Herausforderung an</button>
                        </div>
                        <div className="layer"></div>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className="home__slide slide3">
                <div className="home__slide__pc" id="video5">
                    <video
                        src="/videos/video5.mp4"
                        loop
                        muted
                        playsInline
                        autoPlay
                        className="video"
                    />
                    <div className="home__slide__text">
                        <h1>Stelle dich der Herausforderung</h1>
                        <p>
                            Verlasse deine Komfortzone und nehme neue Herausforderungen an. Unsere
                            erfahrenen Trainer werden dich durch aufregende Workouts und
                            Aktivitäten führen, die deine Fitnessreise bereichern werden.{" "}
                        </p>
                        <button>Akzeptiere die Herausforderung</button>
                    </div>
                    <div className="layer"></div>
                </div>
                {mobile && showSlideNumber == 3 ? (
                    <>
                        <ExportedImage
                            src={video5}
                            alt="Orginal, unoptimized image"
                            width="200"
                            height="200"
                            unoptimized={true}
                            id="image3"
                        />
                        <div className="home__slide__text">
                            <h1>Stelle dich der Herausforderung</h1>
                            <p>
                                Verlasse deine Komfortzone und nehme neue Herausforderungen an.
                                Unsere erfahrenen Trainer werden dich durch aufregende Workouts und
                                Aktivitäten führen, die deine Fitnessreise bereichern werden.{" "}
                            </p>
                            <button>Akzeptiere die Herausforderung</button>
                        </div>
                        <div className="layer"></div>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className="home__slide slide4">
                <div className="home__slide__pc" id="video2">
                    <video
                        src="/videos/video2.mp4"
                        loop
                        muted
                        playsInline
                        autoPlay
                        id="video2"
                        className="video"
                    />
                    <div className="home__slide__text">
                        <h1>Entfalte dein Potenzial</h1>
                        <p>
                            Erreiche deine Ziele mit unserem engagierten Team von Trainern, die dir
                            persönliche Anleitung und Unterstützung bieten. Gemeinsam navigieren
                            wir deine Fitnessreise und gewährleisten deinen Erfolg.{" "}
                        </p>
                        <button>Starte noch heute</button>
                    </div>
                    <div className="layer"></div>
                </div>
                {mobile && showSlideNumber == 4 ? (
                    <>
                        <ExportedImage
                            src={video2}
                            alt="Orginal, unoptimized image"
                            width="200"
                            height="200"
                            unoptimized={true}
                            id="image4"
                        />
                        <div className="home__slide__text">
                            <h1>Entfalte dein Potenzial</h1>
                            <p>
                                Erreiche deine Ziele mit unserem engagierten Team von Trainern, die
                                dir persönliche Anleitung und Unterstützung bieten. Gemeinsam
                                navigieren wir deine Fitnessreise und gewährleisten deinen Erfolg.{" "}
                            </p>
                            <button>Starte noch heute</button>
                        </div>
                        <div className="layer"></div>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className="home__slide slide5">
                <div className="home__slide__pc" id="video1">
                    <video
                        src="/videos/video1.mp4"
                        loop
                        muted
                        playsInline
                        autoPlay
                        id="video1"
                        className="video"
                    />
                    <div className="home__slide__text">
                        <h1>Nähre deinen Körper, transformiere dein Leben</h1>
                        <p>
                            Erlebe die transformative Kraft gesunder Ernährung. Entdecke köstliche
                            und nährstoffreiche Mahlzeiten, die deinen Körper mit Energie
                            versorgen, deine Vitalität steigern und das allgemeine Wohlbefinden
                            fördern.{" "}
                        </p>
                        <button>Entdecke gesunde Rezepte</button>
                    </div>
                    <div className="layer"></div>
                </div>
                {mobile && showSlideNumber == 5 ? (
                    <>
                        <ExportedImage
                            src={video1}
                            alt="Orginal, unoptimized image"
                            width="200"
                            height="200"
                            unoptimized={true}
                            id="image5"
                        />
                        <div className="home__slide__text">
                            <h1>Nähre deinen Körper, transformiere dein Leben</h1>
                            <p>
                                Erlebe die transformative Kraft gesunder Ernährung. Entdecke
                                köstliche und nährstoffreiche Mahlzeiten, die deinen Körper mit
                                Energie versorgen, deine Vitalität steigern und das allgemeine
                                Wohlbefinden fördern.{" "}
                            </p>
                            <button>Entdecke gesunde Rezepte</button>
                        </div>
                        <div className="layer"></div>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className="home__slides__switch">
                <div
                    onClick={() => {
                        setShowSlideNumber(1)
                    }}
                    className={showSlideNumber == 1 ? "playing" : ""}
                ></div>
                <div
                    onClick={() => {
                        setShowSlideNumber(2)
                    }}
                    className={showSlideNumber == 2 ? "playing" : ""}
                ></div>
                <div
                    onClick={() => {
                        setShowSlideNumber(3)
                    }}
                    className={showSlideNumber == 3 ? "playing" : ""}
                ></div>
                <div
                    onClick={() => {
                        setShowSlideNumber(4)
                    }}
                    className={showSlideNumber == 4 ? "playing" : ""}
                ></div>
                <div
                    onClick={() => {
                        setShowSlideNumber(5)
                    }}
                    className={showSlideNumber == 5 ? "playing" : ""}
                ></div>
            </div>
        </div>
    )
}
export default HomePageSlides
