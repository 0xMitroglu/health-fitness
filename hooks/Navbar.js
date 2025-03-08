import React from "react"
import ExportedImage from "next-image-export-optimizer"
import logo from "../public/logoText.png"
import logoAll from "../public/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCartShopping,
    faMagnifyingGlass,
    faUser,
    faChevronDown,
    faBars,
    faClose,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import facebook from "../public/facebook.png"
import instagram from "../public/instagram.png"
import twitter from "../public/twitter.png"
import youtube from "../public/youtube.png"
import { useRouter } from "next/router"
const Navbar = () => {
    const router = useRouter()
    const [mobileNav, setMobileNav] = useState(false)
    const [showNutrition, setShowNutrition] = useState(false)
    const [showFitness, setShowFitness] = useState(false)

    useEffect(() => {
        const div = document.querySelector(".nav__mobile")
        if (mobileNav) {
            div.style.right = "0"
        } else {
            div.style.right = "-300px"
        }
        setShowFitness(false)
        setShowNutrition(false)
    }, [mobileNav])

    return (
        <>
            <div className="nav">
                <div
                    className="nav__image"
                    onClick={() => {
                        router.push({
                            pathname: `/`,
                        })
                    }}
                >
                    <ExportedImage
                        src={logo}
                        alt="Orginal, unoptimized image"
                        width="200"
                        height="200"
                        unoptimized={true}
                    />
                </div>
                <ul className="nav__list">
                    <li className="nav__list__li">
                        <span className="nav__list__li__title">
                            Training <FontAwesomeIcon icon={faChevronDown} className="fa" />
                        </span>
                        <div className="nav__list__sub">
                            <div className="nav__list__sub__box">
                                <h2>Einführung</h2>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>
                            <div className="nav__list__sub__box">
                                <h2>Trainingsplan</h2> <p>Untertitel</p>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>{" "}
                            <div className="nav__list__sub__box">
                                <h2
                                    onClick={() => {
                                        router.push({
                                            pathname: `/tabata`,
                                        })
                                    }}
                                >
                                    Tabata
                                </h2>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>{" "}
                            <div className="nav__list__sub__box">
                                <h2>Tipps und Tricks</h2> <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>
                        </div>
                    </li>
                    <li className="nav__list__li">
                        <span className="nav__list__li__title">
                            Ernährung <FontAwesomeIcon icon={faChevronDown} className="fa" />
                        </span>
                        <div className="nav__list__sub">
                            <div className="nav__list__sub__box">
                                <h2>Einführung</h2>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>
                            <div className="nav__list__sub__box">
                                <h2
                                    onClick={() => {
                                        router.push({
                                            pathname: `nutritionplaner`,
                                        })
                                    }}
                                >
                                    Ernährungsplaner
                                </h2>{" "}
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>{" "}
                            <div className="nav__list__sub__box">
                                <h2
                                    onClick={() => {
                                        router.push({
                                            pathname: `calories-calculator`,
                                        })
                                    }}
                                >
                                    Kalorien Rechner
                                </h2>
                                <p
                                    onClick={() => {
                                        router.push({
                                            pathname: `weight-tracker`,
                                        })
                                    }}
                                >
                                    Gewicht Tracker
                                </p>
                                <p>Untertitel</p>
                            </div>{" "}
                            <div className="nav__list__sub__box">
                                <h2>Tipps und Tricks</h2> <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>
                        </div>
                    </li>
                    <li className="nav__list__li">
                        <span className="nav__list__li__title">Shop </span>
                    </li>
                </ul>
                <div className="nav-user">
                    <FontAwesomeIcon icon={faUser} className="fa" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fa" />{" "}
                    <FontAwesomeIcon
                        icon={faBars}
                        className="fa faBars"
                        onClick={() => {
                            setMobileNav((el) => {
                                return !el
                            })
                        }}
                    />
                    <FontAwesomeIcon icon={faCartShopping} className="fa" />
                </div>
            </div>
            <div className="nav__mobile">
                <div className="nav__mobile__close">
                    <FontAwesomeIcon
                        icon={faClose}
                        className="fa"
                        onClick={() => {
                            setMobileNav((el) => {
                                return !el
                            })
                        }}
                    />
                </div>
                <div className="nav__mobile__image">
                    <ExportedImage
                        src={logoAll}
                        alt="Orginal, unoptimized image"
                        width="200"
                        height="200"
                        unoptimized={true}
                        onClick={() => {
                            router.push({
                                pathname: `/`,
                            })
                            setMobileNav(false)
                        }}
                    />
                </div>
                <div className="nav__mobile__box">
                    <div
                        className="nav__mobile__box__title"
                        onClick={() => {
                            setShowFitness((el) => {
                                return !el
                            })
                        }}
                    >
                        <h1>Training</h1>{" "}
                        <FontAwesomeIcon
                            icon={showFitness ? faChevronUp : faChevronDown}
                            className="fa"
                        />
                    </div>
                    {showFitness ? (
                        <div className="nav__mobile__sub">
                            <div className="nav__mobile__sub__box">
                                <h2>Einführung</h2>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>
                            <div className="nav__mobile__sub__box">
                                <h2>Trainingsplan</h2> <p>Untertitel</p>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>{" "}
                            <div className="nav__mobile__sub__box">
                                <h2
                                    onClick={() => {
                                        router.push({
                                            pathname: `/tabata`,
                                        })
                                    }}
                                >
                                    Tabata
                                </h2>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>{" "}
                            <div className="nav__mobile__sub__box">
                                <h2>Tipps und Tricks</h2> <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="nav__mobile__box">
                    <div
                        className="nav__mobile__box__title"
                        onClick={() => {
                            setShowNutrition((el) => {
                                return !el
                            })
                        }}
                    >
                        <h1>Ernährung</h1>{" "}
                        <FontAwesomeIcon
                            icon={showNutrition ? faChevronUp : faChevronDown}
                            className="fa"
                        />
                    </div>
                    {!showNutrition ? (
                        ""
                    ) : (
                        <div className="nav__mobile__sub">
                            <div className="nav__mobile__sub__box">
                                <h2>Einführung</h2>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>
                            <div className="nav__mobile__sub__box">
                                <h2
                                    onClick={() => {
                                        router.push({
                                            pathname: `nutritionplaner`,
                                        })
                                        setMobileNav(false)
                                    }}
                                >
                                    Ernährungsplaner
                                </h2>{" "}
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>{" "}
                            <div className="nav__mobile__sub__box">
                                <h2
                                    onClick={() => {
                                        router.push({
                                            pathname: `calories-calculator`,
                                        })
                                        setMobileNav(false)
                                    }}
                                >
                                    Kalorien Rechner
                                </h2>
                                <p
                                    onClick={() => {
                                        router.push({
                                            pathname: `weight-tracker`,
                                        })
                                        setMobileNav(false)
                                    }}
                                >
                                    Gewicht Tracker
                                </p>
                                <p>Untertitel</p>
                            </div>{" "}
                            <div className="nav__mobile__sub__box">
                                <h2>Tipps und Tricks</h2> <p>Untertitel</p>
                                <p>Untertitel</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="nav__mobile__box">
                    <div className="nav__mobile__box__title">
                        <h1>Shop</h1>
                    </div>
                </div>
                <div className="nav__mobile__footer">
                    <ExportedImage
                        src={facebook}
                        alt="Orginal, unoptimized image"
                        width="200"
                        height="200"
                        unoptimized={true}
                    />
                    <ExportedImage
                        src={twitter}
                        alt="Orginal, unoptimized image"
                        width="200"
                        height="200"
                        unoptimized={true}
                    />
                    <ExportedImage
                        src={youtube}
                        alt="Orginal, unoptimized image"
                        width="200"
                        height="200"
                        unoptimized={true}
                    />
                    <ExportedImage
                        src={instagram}
                        alt="Orginal, unoptimized image"
                        width="200"
                        height="200"
                        unoptimized={true}
                    />
                </div>
            </div>
        </>
    )
}

export default Navbar
