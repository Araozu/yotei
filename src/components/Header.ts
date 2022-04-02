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

import { StyleSheet, css } from "aphrodite/no-important"
import { YElem, Y } from "../YElem/YElem"

const e = StyleSheet.create({
    titleContainer: {
        backgroundColor: "#212121",
        color: "#fefefe",
    },
    motto: {
        paddingTop: "3rem",
        paddingBottom: "1rem",
        fontSize: "3rem",
    },
    motto2: {
        padding: "0 4rem",
        fontSize: "1.25rem",
    },
    padded: {
        paddingLeft: "4rem",
        paddingRight: "4rem",
    },
    header2: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "1.4rem",
        width: "100%",
        zIndex: 100,
        backgroundColor: "var(--bg-color)",
        display: "flex",
        alignItems: "center",
    },
    headerLink: {
        display: "flex",
        height: "1.4rem",
        alignItems: "center",
        justifyContent: "center",
    },
    headerMainLink: {
        fontWeight: "bold",
        textDecoration: "none",
        color: "var(--color)",
        padding: "0 1rem",
        fontSize: "0.9rem",
        ":hover": {
            textDecoration: "underline",
        },
    },
    headerNormalLink: {
        textDecoration: "none",
        color: "var(--color)",
        padding: "0 0.5rem",
        fontSize: "0.8rem",
        ":hover": {
            textDecoration: "underline",
        },
    },
})

export class Header extends YElem {
    constructor() {
        const parent = Y.div()
        super(parent)

        parent.add(null, [
            Y.div({"className": css(e.motto, e.padded)}, [
                "A ",
                Y.span({style: "color: var(--c1); font-weight: bold"}, "B"),
                Y.span({style: "color: var(--c2); font-weight: bold"}, "E"),
                Y.span({style: "color: var(--c3); font-weight: bold"}, "TT"),
                Y.span({style: "color: var(--c4); font-weight: bold"}, "E"),
                Y.span({style: "color: var(--c5); font-weight: bold"}, "R"),
                " way to create",
                Y.br(),
                "a schedule",
            ]),
            Y.p({className: css(e.motto2)}, "That's Yotei"),
        ])

        /*
        this.instance.innerHTML = `

        <p class="${css(e.motto2)}">That's Misti</p>

        <div class="${css(e.padded)}">
            <Link href="#test">
                <MainButton text={"Learn"} color={"#04abfc"} />
            </Link>
            <MainButton text={"Install"} color={"#e7b711"} />
            <Link href="#test">
                <MainButton text={"Spec"} color={"#39b487"} />
            </Link>
        </div>
        `
         */
    }
}
