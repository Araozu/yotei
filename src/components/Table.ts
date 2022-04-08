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

import { Y, YElem } from "../YElem/YElem"
import { TableRow } from "./Table/TableRow"
import { TableManager } from "./TableManager"

export type Day = "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes";

export const days: Day[] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
export const hours = [
    "07:00",
    "07:50",
    "08:50",
    "09:40",
    "10:40",
    "11:30",
    "12:20",
    "13:10",
    "14:00",
    "14:50",
    "15:50",
    "16:40",
    "17:40",
    "18:30",
    "19:20",
    "20:10",
    "21:00",
]

export function dayToColor(d: Day): string {
    switch (d) {
        case "Lunes": return "var(--c1)"
        case "Martes": return "var(--c2)"
        case "Miercoles": return "var(--c3)"
        case "Jueves": return "var(--c4)"
        case "Viernes": return "var(--c5)"
    }
}

export class Table extends YElem {
    private manager: TableManager
    constructor(manager: TableManager) {
        const parent = Y.div()
        super(parent)
        this.manager = manager

        const rows = hours.map((h) => new TableRow(h, this.manager))
        parent.add({style: "padding-top: 2rem; font-size: 16px"}, rows)
    }
}
