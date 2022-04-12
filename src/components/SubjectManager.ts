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

import { Professor } from "./ProfessorManager"
import { Day } from "./Table"

export interface SerializedGroup {
    letter: string
    professor: string
    hours: {day: Day, hour: string}[]
}
export class Group {
    /**
     * A letter that represents the course
     */
    public readonly letter: string
    /**
     * The name of the professor
     */
    public readonly professor: Professor
    public readonly hours: [Day, string][] = []

    constructor(letter: string, professor: Professor) {
        this.letter = letter.toUpperCase()
        this.professor = professor
    }

    addHour(day: Day, hour: string) {
        this.hours.push([day, hour])
    }

    getSerializableObject(): SerializedGroup {
        return {
            letter: this.letter,
            professor: this.professor.name,
            hours: this.hours.map(([day, hour]) => ({
                day,
                hour,
            })),
        }
    }
}

export interface SerializedSubject {
    name: string
    fullName: string
    groups: SerializedGroup[]
    labGroups: SerializedGroup[]
}
export class Subject {
    /**
     * An abbreviation of the subject, for display in the schedule. e.g. FP1
     */
    public readonly name: string
    /**
     * The full name of the subject. e.g. Fundamentos de Programación 1
     */
    public readonly fullName: string
    private groups: Group[] = []
    private labGroups: Group[] = []

    constructor(name: string, fullName = "") {
        this.name = name.toUpperCase()
        this.fullName = fullName
    }

    addGroup(_letter: string, professor: Professor, isLab = false): Group {
        const letter = _letter.toUpperCase()
        const group = new Group(letter, professor)
        if (isLab) {
            this.labGroups.push(group)
        } else {
            this.groups.push(group)
        }
        return group
    }

    getGroup(_letter: string, isLab = false): Group | undefined {
        const letter = _letter.toUpperCase()
        if (isLab) {
            return this.groups.find((x) => x.letter === letter)
        } else {
            return this.labGroups.find((x) => x.letter === letter)
        }
    }

    hasGroup(_letter: string, isLab = false): boolean {
        const letter = _letter.toUpperCase()
        if (isLab) {
            return this.labGroups.find((x) => x.letter === letter) !== undefined
        } else {
            return this.groups.find((x) => x.letter === letter) !== undefined
        }
    }

    addHour(_letter: string, isLab: boolean, day: Day, hour: string) {
        const letter = _letter.toUpperCase()
        const group = isLab
            ? this.labGroups.find((x) => x.letter === letter)!
            : this.groups.find((x) => x.letter === letter)!
        group.addHour(day, hour)
    }

    getSerializableObject(): SerializedSubject {
        return {
            name: this.name,
            fullName: this.fullName,
            groups: this.groups.map((x) => x.getSerializableObject()),
            labGroups: this.labGroups.map((x) => x.getSerializableObject()),
        }
    }
}

export class SubjectManager {
    private subjects = new Map<string, Subject>()

    register(_subjectName: string, _group?: string, professor?: Professor) {
        const subjectName = _subjectName.toUpperCase()
        const group = _group?.toUpperCase()
        if (!this.subjects.has(subjectName)) {
            this.subjects.set(subjectName, new Subject(subjectName))
        }

        if (group && professor) {
            const subject = this.subjects.get(subjectName)!
            const isLab = group.length === 2
            const groupLetter = isLab ? group.charAt(1) : group

            subject.addGroup(groupLetter, professor, isLab)
        }
    }

    has(_subjectName: string, _group: string, isLab: boolean): boolean {
        const subjectName = _subjectName.toUpperCase()
        const group = _group?.toUpperCase()
        if (!this.subjects.has(subjectName)) return false
        const subject = this.subjects.get(subjectName)!
        return subject.hasGroup(group, isLab)
    }

    get(_subjectName: string): Subject | undefined {
        const subjectName = _subjectName.toUpperCase()
        return this.subjects.get(subjectName)
    }

    getSerializableObject(): {[k: string]: SerializedSubject} {
        const obj: {[k: string]: SerializedSubject} = {}
        for (const [subjectName, subject] of this.subjects.entries()) {
            obj[subjectName] = subject.getSerializableObject()
        }
        return obj
    }
}
