import React from "react"

import HomePageSlides from "./HomePageSlides"
import { useEffect } from "react"
const HomePage = () => {
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    useEffect(() => {
        window.addEventListener("resize", handleScroll)
        handleScroll()
        return () => {
            window.removeEventListener("resize", handleScroll)
        }
    }, [])

    useEffect(() => {
        const navSub = document.querySelectorAll(".nav__list__sub")

        const navLi = document.querySelectorAll(".nav__list__li")
        navSub.forEach((div, index) => {
            const value = navLi[0].offsetHeight - 2 + "px"
            div.style.top = `calc(${value} + 6vh)`
        })
    }, [])
    useEffect(() => {
        const handleMouseMovement = (event) => {
            handleScroll()
        }

        // Add event listener for mouse movement
        window.addEventListener("mousemove", handleMouseMovement)

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("mousemove", handleMouseMovement)
        }
    }, [])
    const handleScroll = async () => {
        const navSub = document.querySelectorAll(".nav__list__sub")

        const navLi = document.querySelectorAll(".nav__list__li")
        navSub.forEach((div, index) => {
            const value = navLi[0].offsetHeight - 2 + "px"
            div.style.top = `calc(${value} + 6vh)`
        })

        const scrollTop = window.scrollY
        const nav = document.querySelector(".nav")
        if (
            scrollTop > nav.offsetHeight &&
            scrollTop <= window.innerHeight / 2 &&
            nav.style.top !== "-200px"
        ) {
            nav.style.top = "-200px"
            nav.style.background = "transparent"
        } else if (scrollTop >= window.innerHeight / 2 && nav.style.top == "-200px") {
            nav.style.position = "fixed"
            nav.style.top = "0"
            nav.style.background = "white"
            nav.style.color = "black"
            nav.style.borderBottom = "1px solid #e8e8e1"
        } else if (scrollTop <= window.innerHeight / 2 && scrollTop <= nav.offsetHeight) {
            nav.style.position = "absolute"
            nav.style.top = "0"
            nav.style.background = "transparent"
            nav.style.border = "none"
            nav.style.color = "white"
        }
    }

    return (
        <>
            {" "}
            <HomePageSlides />
            {/* <div className="home__page2">
                <h1>hi</h1>
            </div> */}
        </>
    )
}
export default HomePage
