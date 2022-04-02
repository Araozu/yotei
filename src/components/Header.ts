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
import { LoadingBar } from "./LoadingBar"

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

class MainButton extends YElem {
    constructor(text: string, color: string) {
        const parent = Y.button()
        super(parent)
        const style = StyleSheet.create({
            e: {
                padding: "0.6rem 1rem",
                fontSize: "1rem",
                // fontWeight: "bold",
                marginRight: "1rem",
                marginBottom: "2rem",
                marginTop: "2rem",
                border: `solid 3px ${color}`,
                textDecorationLine: "underline",
                backgroundColor: "var(--bg-color)",
                color: "var(--color)",
                borderRadius: "2px",
                cursor: "pointer",
                ":hover": {
                    color: "white",
                    backgroundColor: `${color}`,
                },
            },
        })
        parent.add({className: css(style.e)}, text)
    }
}

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
            Y.div({className: css(e.padded)}, [
                Y.a({href: "test1"}, new MainButton("Start", "var(--c2)")),
                Y.a({href: "test2"}, new MainButton("Create", "var(--c1)")),
                Y.a({href: "test3"}, new MainButton("Help", "var(--c5)")),
            ]),
            new LoadingBar(true),
        ])
    }
}
