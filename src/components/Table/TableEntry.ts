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

/**
 * Represents an element of the schedule. It changes color when hovered,
 * highlights the hour and communicates with other entries via TableManager.
 *
 * It is placed inside a TableCell.
 */
export class TableEntry extends YElem {
    private manager: TableManager
    constructor(manager: TableManager) {
        const parent = Y.div()
        super(parent)
        this.manager = manager
    }
}
