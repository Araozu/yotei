/*
 * Copyright (c) 2022
 * Fernando Enrique Araoz Morales.
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation; version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import { YElem, Y } from "../YElem/YElem"
import { css, StyleSheet } from "aphrodite/no-important"

const time = (t: number) => new Promise((resolve) => {
    setTimeout(resolve, t)
})

export class LoadingBar extends YElem {
    private rainbowBar: YElem
    private animationActive = false
    private animationPosition = 0

    constructor(isMainPage: boolean) {
        const el = Y.div()
        super(el)
        const styles = StyleSheet.create({
            container: {
                width: "100%",
                overflow: "hidden",
                position: isMainPage ? "sticky" : "fixed",
                top: isMainPage ? "-0.75rem" : "0.6rem",
                zIndex: 1,
            },
            separator: {
                height: "1rem",
                width: "200%",
            },
        })

        this.rainbowBar = Y.div({className: `${css(styles.separator)} rainbow-separator`})

        el.add({className: css(styles.container)}, this.rainbowBar)

        this.rainbowBar.getInstance().addEventListener("click", () => {
            if (this.animationActive) {
                this.animationActive = false
            } else {
                this.animationActive = true
                this.animate()
            }
        })
    }

    setPosition(position: number) {
        this.animationPosition = position
        this.rainbowBar.getInstance().style.transform = `translateX(-${this.animationPosition}%)`
    }

    async animate() {
        const tick = 35
        const maxSpeed = 0.5
        const minSpeed = 0.09
        const accelerationRate = 1.5
        let speed = 0.06

        // accelerate
        do {
            if (this.animationPosition >= 50) this.animationPosition = 0

            this.setPosition(this.animationPosition + speed)
            if (speed < maxSpeed) {
                speed *= accelerationRate
            } else {
                speed = maxSpeed
            }
            this.animationPosition += speed
            await time(tick)
        } while (this.animationActive)

        // decelerate
        while (speed > minSpeed) {
            if (this.animationPosition >= 50) this.animationPosition = 0

            this.setPosition(this.animationPosition + speed)
            speed /= accelerationRate
            this.animationPosition += speed
            await time(tick)
        }
    }

}
