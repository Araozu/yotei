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
import { StyleSheet, css } from "aphrodite/no-important"
import { TableManager } from "../TableManager"

const e = StyleSheet.create({
    celdaComun: {
        width: "20%",
        textAlign: "center",
        padding: "0 0.7rem",
        boxSizing: "border-box",
        userSelect: "none",
        display: "inline-block",
    },
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
 * Represents a container in a specific hour and day
 */
export class TableCell extends YElem {
    private manager: TableManager
    protected parent: YElem
    constructor(manager: TableManager) {
        const parent = Y.div()
        super(parent)
        parent.add({className: css(e.celdaComun)}, "cell")

        this.manager = manager
        this.parent = parent
    }
}

export class SelectableTableCell extends TableCell {
    private isSelected = false
    constructor(manager: TableManager) {
        super(manager)
        this.parent.getInstance().addEventListener("mouseenter", () => this.toggleSelection())
    }

    public toggleSelection() {
        this.isSelected = !this.isSelected
        if (this.isSelected) {
            this.parent.getInstance().style.borderLeft = "solid 3px var(--c5)"
            this.parent.getInstance().style.borderRight = "solid 3px var(--c5)"
        } else {
            this.parent.getInstance().style.borderLeft = "none"
            this.parent.getInstance().style.borderRight = "none"
        }
    }
}
