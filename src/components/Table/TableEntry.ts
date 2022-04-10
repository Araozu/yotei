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

import { Y, YElem } from "../../YElem/YElem"
import { TableManager } from "../TableManager"
import { StyleSheet, css } from "aphrodite/no-important"
import { Subject } from "../SubjectManager"


const e = StyleSheet.create({
    celdaCurso: {
        display: "inline-block",
        padding: "0.25rem 0.35rem",
        cursor: "pointer",
        borderRadius: "5px",
        // transition: "background-color 100ms, color 100ms"
    },
    celdaResaltado: {
        // color: "#151515"
    },
    celdaCursoTeoria: {
        fontWeight: "bold",
    },
    celdaCursoLab: {
        fontStyle: "italic",
    },
    celdaSeleccionado: {
        textDecoration: "underline",
        backgroundColor: "rgba(200, 200, 200, 0.3)",
    },
    celdaOculto: {
        opacity: 0.3,
    },
    celdaResaltadoOculto: {
        opacity: 0.7,
    },
    celdaResaltadoSeleccionado: {
        textDecoration: "underline",
    },
})


/**
 * Represents an entry of the schedule. It changes color when hovered,
 * highlights the hour and communicates with other entries via TableManager.
 *
 * It is placed inside a TableCell.
 */
export class TableEntry extends YElem {
    private manager: TableManager
    private hovered = false
    private color: string
    private subject: Subject
    private isLab: boolean
    private group: string

    constructor(
        subject: Subject,
        group: string,
        isLab: boolean,
        color: string,
        manager: TableManager,
    ) {
        const parent = Y.div()
        super(parent)
        parent.add(
            {className: css(
                e.celdaCurso,
                isLab ? e.celdaCursoLab : e.celdaCursoTeoria,
            )},
            `${subject.name} ${isLab ? "L" : ""}${group}`,
        )

        this.isLab = isLab
        this.group = group
        this.manager = manager
        this.color = color
        this.subject = subject
        parent.getInstance().addEventListener("mouseenter", () => {
            this.hovered = true
            this.checkHover()
        })
        parent.getInstance().addEventListener("mouseleave", () => {
            this.hovered = false
            this.checkHover()
        })
    }

    private checkHover() {
        if (this.hovered) {
            this.getInstance().style.backgroundColor = this.color
            // If the bg color is c1, c3 or c5, add a black color for contrast
            //if (this.color === "var(--c1)" || this.color === "var(--c3)" || this.color === "var(--c5)") {
            //    this.getInstance().style.color = "black"
            //} else {
            this.getInstance().style.color = "white"
            //}
        } else {
            this.getInstance().style.backgroundColor = ""
            this.getInstance().style.color = ""
        }
    }

    public clone(): TableEntry {
        return new TableEntry(
            this.subject,
            this.group,
            this.isLab,
            this.color,
            this.manager,
        )
    }
}
