import React from "react"
import { useEffect } from "react"
import CaloriesCalculator from "@/hooks/CaloriesCalculator"
import NavSettings from "@/back-end/NavSettings"

const Calculator = () => {
    useEffect(() => {
        const handleScroll = () => {
            const allPages = document.querySelectorAll(".page")
            const nav = document.querySelector(".nav")
            for (let i = allPages.length - 1; i >= 0; i--) {
                allPages[i].style.top = `${nav.offsetHeight}px`
            }
        }
        window.addEventListener("resize", handleScroll)
        return () => {
            window.removeEventListener("resize", handleScroll)
        }
    }, [])
    useEffect(() => {
        const body = document.querySelector(".body")
        body.style.color = "black"
        const allPages = document.querySelectorAll(".page")
        const nav = document.querySelector(".nav")
        for (let i = allPages.length - 1; i >= 0; i--) {
            allPages[i].style.top = `${nav.offsetHeight}px`
        }
        nav.style.color = "black"
    }, [])
    return (
        <>
            <NavSettings />
            <CaloriesCalculator />
        </>
    )
}
export default Calculator
