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

import { SelectableTableManager } from "./TableManager"
import { YElem, Y } from "../YElem/YElem"
import { StyleSheet, css } from "aphrodite/no-important"
import { Day, days } from "./Table"
import { SubjectManager } from "./SubjectManager"
import { Professor, ProfessorManager } from "./ProfessorManager"
import { TableEntry } from "./Table/TableEntry"

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
    private tableManager: SelectableTableManager
    private subjectManager: SubjectManager
    private professorManager = new ProfessorManager()
    private inputEl: YElem

    constructor(manager: SelectableTableManager, subjectManager: SubjectManager) {
        const parent = Y.div()
        super(parent)
        this.tableManager = manager
        this.subjectManager = subjectManager

        const formEl = Y.form({style: "display: inline-block; width: 90%"})
        const inputEl = Y.input({className: css(style.cliInput)})
        this.inputEl = inputEl
        formEl.add(null, inputEl)

        parent.add({className: css(style.cli)}, [
            Y.span(null, "> "),
            formEl,
        ])

        formEl.getInstance().addEventListener("submit", (ev) => {
            ev.preventDefault()
            this.interpret((inputEl.getInstance() as HTMLInputElement).value)
        })
    }

    /**
     * Parses and interprets a command.
     *
     * g [DAY] HOUR - moves to the hour
     * where HOUR =
     * | d - Moves to 0d:00, e.g. 7 -> 07:00
     * | dd - Moves to dd:00, e.g. 10 -> 10:00
     * | ddd - Moves to dd:d0, e.g. 145 -> 14:50
     * and DAY is the first 2 letters of the day
     *
     * a SUBJECT GROUP [TIMES] - adds the subject to the current hour.
     * if TIMES is specified, adds it to the next times cells
     * e.g. a fp1 3
     * where GROUP = [l]L, e.g. la, lc, a, b, c
     *
     * r SUBJECT - registers a new subject
     * r SUBJECT GROUP PROFESSOR - registers a new group and its professor
     *
     * @param line
     * @private
     */
    private interpret(line: string) {
        const result0 = CLI.parseNCommand(line)
        if (result0) {
            this.tableManager.nextCell()
            this.handleSuccess()
            return
        }

        const result1 = CLI.parseGCommand(line)
        if (result1 !== null) {
            const [day, hour] = result1
            // TODO: check if hour exists, and handle error
            this.tableManager.highlightCell(hour, day)
            this.handleSuccess()
            return
        }

        const result2 = CLI.parseRCommand(line)
        if (result2 !== null) {
            const [subject, group, professorName] = result2

            let professor: Professor | undefined
            if (professorName) {
                const professorArr = this.professorManager.getMatches(professorName)
                if (professorArr.length > 0 && professorArr[0].name === professorName) {
                    professor = professorArr[0]
                } else {
                    professor = this.professorManager.add(professorName)
                }
            }

            this.subjectManager.register(subject, group, professor)
            console.log("subject registered", subject, group, professorName)
            this.handleSuccess()
            return
        }

        const result3 = CLI.parseACommand(line)
        if (result3 !== null) {
            const [subject, group, _repeat] = result3
            const isLab = group.length === 2
            const groupLetter = isLab ? group.charAt(1) : group

            if (this.subjectManager.has(subject, groupLetter, isLab)) {
                const subjectObj = this.subjectManager.get(subject)!
                // Create a table entry and register
                const color = this.tableManager.getCurrentColor()
                // TODO: clone
                const entry = new TableEntry(subjectObj, group, isLab, color, this.tableManager)
                this.tableManager.registerEntryAtCurrentPosition(entry)
                console.log("Entry registered (?)")
                this.handleSuccess()
            } else {
                // TODO: Error handling with specific reasons shown to the user
                console.log("subject not found", subject, group)
                this.handleError()
            }
            return
        }

        this.handleError()
    }

    private handleError() {
        const el = this.getInstance()
        el.style.borderColor = "var(--c4)"
        setTimeout(() => {
            el.style.borderColor = "#dedede"
        }, 2500)
    }

    private handleSuccess() {
        const el = this.getInstance()
        el.style.borderColor = "var(--c5)";
        (this.inputEl.getInstance() as HTMLInputElement).value = ""
        setTimeout(() => {
            el.style.borderColor = "#dedede"
        }, 500)
    }

    /**
     * Moves to the specified cell
     * <pre>
     * g command = "g", {day}, time
     * digit = "0" .. "9"
     * time = digit, {digit, {digit}}
     * </pre>
     * @param line to test
     */
    private static parseGCommand(line: string): [Day | undefined, string] | null {
        const regex = /g\s+((\w+)\s+)?(\d\d?\d?)/i.exec(line)
        if (regex && regex[3]) {
            let day: Day | undefined = undefined
            let hour = regex[3]

            // Handle day
            if (regex[2]) {
                for (const d of days) {
                    if (d.toLowerCase().startsWith(regex[2].toLowerCase())) {
                        day = d
                    }
                }
            }

            // Handle hour
            switch (hour.length) {
                case 1: {
                    hour = `0${hour}:00`
                    break
                }
                case 2: {
                    hour = `${hour}:00`
                    break
                }
                case 3: {
                    hour = `${hour.substring(0, 2)}:${hour.charAt(2)}0`
                    break
                }
                case 4: {
                    hour = `${hour.substring(0, 2)}:${hour.substring(2, 4)}`
                    break
                }
            }
            return [day, hour]
        }
        return null
    }

    /**
     * Adds an entry to the current cell
     * <pre>
     * a command = "a", subject, group, {times}
     * group = {"l"}, "a" .. "z"
     * </pre>
     * @param line to test
     */
    private static parseACommand(line: string): [string, string, number | null] | null {
        const regex = /a\s+(\w+)\s+(l?\w)\s*(\d)?$/i.exec(line)
        if (regex && regex[1] && regex[2]) {
            const times = regex[3] ? parseInt(regex[3], 10) : null
            return [regex[1], regex[2], times]
        }

        return null
    }

    private static parseRCommand(line: string): [string, string | undefined, string | undefined] | null {
        const values = /r\s+(\w+)\s*(l?\w)?\s*([\w\s]+)?/i.exec(line)
        if (values && values[1]) {
            return [values[1], values[2], values[3]]
        }
        return null
    }

    /**
     * Moves the selected cell to the next position
     * <pre>
     * n command = "n"
     * </pre>
     * @param line
     * @private
     */
    private static parseNCommand(line: string): boolean {
        return /\s*n\s*/i.test(line)
    }
}
