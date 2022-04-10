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
        this.letter = letter
        this.professor = professor
    }
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
        this.name = name
        this.fullName = fullName
    }

    addGroup(letter: string, professor: Professor, isLab = false): Group {
        const group = new Group(letter, professor)
        if (isLab) {
            this.labGroups.push(group)
        } else {
            this.groups.push(group)
        }
        return group
    }

    getGroup(letter: string, isLab = false): Group | undefined {
        if (isLab) {
            return this.groups.find((x) => x.letter === letter)
        } else {
            return this.labGroups.find((x) => x.letter === letter)
        }
    }

    hasGroup(letter: string, isLab = false): boolean {
        if (isLab) {
            return this.labGroups.find((x) => x.letter === letter) !== undefined
        } else {
            return this.groups.find((x) => x.letter === letter) !== undefined
        }
    }
}

export class SubjectManager {
    private subjects = new Map<string, Subject>()

    register(subjectName: string, group?: string, professor?: Professor) {
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

    has(subjectName: string, group: string, isLab: boolean): boolean {
        if (!this.subjects.has(subjectName)) return false
        const subject = this.subjects.get(subjectName)!
        return subject.hasGroup(group, isLab)
    }

    get(subjectName: string): Subject | undefined {
        return this.subjects.get(subjectName)
    }
}
