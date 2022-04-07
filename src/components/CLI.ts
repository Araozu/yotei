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

import { TableManager } from "./TableManager"
import { YElem, Y } from "../YElem/YElem"
import { StyleSheet, css } from "aphrodite/no-important"

const style = StyleSheet.create({
    cli: {
        boxSizing: "border-box",
        position: "fixed",
        bottom: "1vh",
        left: "25vw",
        width: "50vw",
        backgroundColor: "#202020",
        color: "#dedede",
        fontFamily: "Iosevka, monospace",
        zIndex: 2,
        border: "solid 1px #dedede",
        padding: "0.25rem",
        borderRadius: "10px",
    },
    cliInput: {
        backgroundColor: "#202020",
        color: "#dedede",
        border: "none",
        width: "90%",
        ":focus": {
            outline: "none",
        },
    },
})

/**
 * Creates a small floating cli in the page, used to interact with a schedule
 * via a TableManager
 */
export class CLI extends YElem {
    private manager: TableManager

    constructor(manager: TableManager) {
        const parent = Y.div()
        super(parent)
        this.manager = manager

        const formEl = Y.form({style: "display: inline-block"})
        const inputEl = Y.input({className: css(style.cliInput)})
        formEl.add(null, inputEl)

        parent.add({className: css(style.cli)}, [
            Y.span(null, "> "),
            formEl,
        ])

        formEl.getInstance().addEventListener("submit", (ev) => {
            ev.preventDefault()
        })
    }
}
