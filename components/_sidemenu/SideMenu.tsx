'use client'

import { useEffect, useState } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { DesktopNav } from './Desktop'
import { MobileNav } from './Mobile'

const { mobile, tablet, laptop, desktop } = {
    mobile: 600,
    tablet: 750,
    laptop: 1200,
    desktop: 1900
} as const

export const SideMenu = () => {
    const [menuExpanded, setMenuExpanded] = useState(false)
    const [curve, setCurve] = useState('M60,500H0V0h60c0,0,20,172,20,250S60,900,60,500z')
    const [axis, setAxis] = useState({ x: 10, y: 0 })

    const { width, height } = useWindowDimensions()
    const mousePosition = useMousePosition()

    const navItems = ['header', 'whatIdo', 'portfolio', 'about', 'contact']


    const isCurrentDevice = {
        mobile: width < mobile,
        tablet: width < laptop && width > mobile,
        laptop: width < desktop && width > tablet,
        desktop: width > desktop,
    }

    let targetX = 0
    let xitteration = 50
    let yitteration = 50

    let hoverZone = 350


    const easeOut = (currentIteration: number, startValue: number, changeInValue: number, totalIterations: number) => changeInValue * (-Math.pow(2, (-10 * currentIteration) / totalIterations) + 1) + startValue


    useEffect(() => {
        animatedCurve()
    }, [mousePosition])

    const animatedCurve = () => {
        if (axis.x > mousePosition.x - 1 && axis.x < mousePosition.x + 1) {
            xitteration = 0
        } else {
            if (menuExpanded) {
                targetX = 0
            } else {
                xitteration = 0
                if (mousePosition.x > hoverZone) {
                    targetX = 0
                } else {
                    targetX = -((20 / 100) * (mousePosition.x - hoverZone))
                }
            }
            xitteration++
        }

        setAxis((prevState) => ({ ...prevState, x: easeOut(xitteration, axis.x, targetX - axis.x, 100), y: easeOut(yitteration, axis.y, mousePosition.y - axis.y, 100) }))

        const anchorDistance = 200
        const curviness = anchorDistance - 60

        setCurve('M60,' + height + 'H0V0h60v' + (axis.y - anchorDistance) + 'c0,' + curviness + ',' + axis.x + ',' + curviness + ',' + axis.x + ',' + anchorDistance + 'S60,' + axis.y + ',60,' + (axis.y + anchorDistance * 2) + 'V' + height + 'z')
    }



    return isCurrentDevice.desktop ? <DesktopNav links={navItems} axis={axis} curve={curve} menuState={menuExpanded} openMenu={setMenuExpanded} /> : <MobileNav menuState={menuExpanded} openMenu={setMenuExpanded} />
}
