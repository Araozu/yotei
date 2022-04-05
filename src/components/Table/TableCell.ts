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

export class TableCell extends YElem {
    constructor() {
        const parent = Y.div()
        super(parent)
        parent.add({className: css(e.celdaComun)}, "cell")
    }
}
