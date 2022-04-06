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
import { days } from "../Table"
import { SelectableTableCell } from "./TableCell"
import { TableManager } from "../TableManager"

const e = StyleSheet.create({
    celdaHora: {
        textAlign: "center",
        width: "3.3rem",
        padding: "0.25rem 0",
        position: "absolute",
        top: "-0.75rem",
    },
    filaResaltado: {
        position: "absolute",
        zIndex: -1,
        height: "100%",
        transform: "translateX(-1rem)",
    },
    fila: {
        position: "relative",
        zIndex: 2,
        transition: "background-color 250ms, border 100ms",
        marginLeft: "4.3rem",
        display: "flex",
        alignItems: "center",
        minHeight: "1.1rem",
        ":hover": {
            // backgroundColor: "rgba(200, 200, 200, 0.25)"
        },
    },
    filaBorde: {
        position: "absolute",
        top: 0,
        height: "1px",
        width: "100%",
        backgroundColor: "rgba(200, 200, 200, 0.25)",
        zIndex: -2,
    },
    celdaResaltado: {
        height: "102%",
        width: "0.2rem",
        display: "inline-block",
    },
    celdaResaltadoTransparente: {
        backgroundColor: "transparent",
    },
})

class TableRowHighlight extends YElem {
    constructor(color: string) {
        const parent = Y.div({
            className: css(e.celdaResaltado),
            style: `background-color: ${color}`,
        })
        super(parent)
    }
}

export class TableRow extends YElem {
    constructor(hour: string, manager: TableManager) {
        const parent = Y.div({style: "position: relative"})
        super(parent)
        parent.add(null, [
            Y.div(
                {className: css(e.celdaHora)},
                hour,
            ),
            Y.div({className: css(e.fila)}, [
                // Creates a line that differentiates this and the previous row
                Y.div({className: css(e.filaBorde)}),
                // Contains elements that indicate the current row is being highlighted
                Y.div({className: css(e.filaResaltado)}, [
                    new TableRowHighlight("var(--c1)"),
                    new TableRowHighlight("var(--c2)"),
                    new TableRowHighlight("var(--c3)"),
                    new TableRowHighlight("var(--c4)"),
                    new TableRowHighlight("var(--c5)"),
                ]),
                ...(days.map(() => new SelectableTableCell(manager))),
            ]),
        ])
    }
}
