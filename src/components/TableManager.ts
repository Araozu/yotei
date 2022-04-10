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

import { SelectableTableCell, TableCell } from "./Table/TableCell"
import { Day, dayToColor, days, hours } from "./Table"
import { TableEntry } from "./Table/TableEntry"

export class TableManager {
    /**
     * Mapping between day and hour and cell.
     * The first string is DAY_HOUR, e.g. Lunes_07:00
     */
    protected cells: Map<string, TableCell> = new Map()

    registerCell(day: string, hour: string, cell: TableCell) {
        this.cells.set(`${day}_${hour}`, cell)
    }

    registerEntry(day: Day, hour: string, entry: TableEntry) {
        this.cells.get(`${day}_${hour}`)?.addEntry(entry)
    }
}

export class SelectableTableManager extends TableManager {
    private currentDay: Day = days[0]
    private currentHour = hours[0]
    private selectedCell?: SelectableTableCell

    constructor() {
        super()
    }

    registerCell(day: string, hour: string, cell: SelectableTableCell) {
        super.registerCell(day, hour, cell)
    }

    registerEntryAtCurrentPosition(entry: TableEntry) {
        super.registerEntry(this.currentDay, this.currentHour, entry)
    }

    getCurrentColor(): string {
        return dayToColor(this.currentDay)
    }

    highlightCell(hour: string, day: Day = this.currentDay) {
        const pos = `${day}_${hour}`
        if (this.cells.has(pos)) {
            // First unselect current selection
            if (this.selectedCell) {
                this.selectedCell.toggleSelection()
            }
            // Then highlight the cell
            this.selectedCell = (this.cells.get(pos) as SelectableTableCell)
            this.selectedCell.toggleSelection()

            this.currentDay = day
            this.currentHour = hour
        }
    }

    nextCell() {
        [this.currentHour, this.currentDay] = SelectableTableManager.getNextCellCoordinates(this.currentHour, this.currentDay)
        this.highlightCell(this.currentHour, this.currentDay)
    }

    getCurrentCoordinates(): [string, Day] {
        return [this.currentHour, this.currentDay]
    }

    static getNextCellCoordinates(currentHour: string, currentDay: Day): [string, Day] {
        const currentHourPosition = hours.findIndex((x) => currentHour === x)
        // If the last hour is selected, go to first hour of the next day
        if (currentHourPosition === -1 || currentHourPosition === hours.length - 1) {
            const currentDayPosition = days.findIndex((x) => currentDay === x)
            if (currentDayPosition === -1 && currentDayPosition === days.length - 1) {
                // Go to first day
                return [hours[0], days[0]]
            } else {
                // Go to next day
                return [hours[0], days[currentDayPosition + 1]]
            }
        } else {
            return [hours[currentHourPosition + 1], currentDay]
        }
    }
}
