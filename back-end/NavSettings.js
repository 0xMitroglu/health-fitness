import React from "react"
import { useEffect, useState } from "react"
const NavSettings = (props) => {
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    useEffect(() => {
        window.addEventListener("resize", handleScroll)
        handleScroll() // Initial call to get window size on component mount

        return () => {
            window.removeEventListener("resize", handleScroll)
        }
    }, [])

    /* useEffect(() => {
        const navSub = document.querySelectorAll(".nav__list__sub")

        const navLi = document.querySelectorAll(".nav__list__li")
        navSub.forEach((div, index) => {
            const value = navLi[0].offsetHeight - 2 + "px"
            div.style.top = `calc(${value} + 6vh)`
        })
        const nav = document.querySelector(".nav")
        const mobileNav = document.querySelector(".nav__mobile")
        const page = document.querySelectorAll(`.${props.pageClass}`)
        console.log(page)
        for (let i = page.length - 1; i >= 0; i--) {
            page[i].style.top = `${nav.offsetHeight}px`
        }
    }, []) */
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
        /* const navSub = document.querySelectorAll(".nav__list__sub")

        const navLi = document.querySelectorAll(".nav__list__li")
        navSub.forEach((div, index) => {
            const value = navLi[0].offsetHeight - 2 + "px"
            div.style.top = `calc(${value} + 6vh)`
        }) */

        const scrollTop = window.scrollY
        const nav = document.querySelector(".nav")
        if (
            scrollTop > nav.offsetHeight &&
            scrollTop <= window.innerHeight / 3 &&
            nav.style.top !== "-200px"
        ) {
            nav.style.top = "-200px"
        } else if (scrollTop >= window.innerHeight / 3 && nav.style.top == "-200px") {
            nav.style.position = "fixed"
            nav.style.top = "0"
            nav.style.background = "white"
            nav.style.color = "black"
            nav.style.borderBottom = "1px solid #e8e8e1"
            console.log("show")
        } else if (scrollTop <= window.innerHeight / 3 && scrollTop <= nav.offsetHeight) {
            nav.style.position = "absolute"
            nav.style.top = "0"
            nav.style.background = "white"
            nav.style.borderBottom = "1px solid #e8e8e1"
            nav.style.color = "black"
        }
    }

    return <></>
}
export default NavSettings
