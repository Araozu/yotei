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

export class Professor {
    public readonly name: string
    constructor(name: string) {
        this.name = name
    }
}

export class ProfessorManager {
    /**
     * Maps a character with a (possibly) sorted array of professors
     */
    private professors = new Map<string, Professor[]>()

    add(name: string): Professor {
        const firstChar = name.charAt(0)
        if (!this.professors.has(firstChar)) {
            this.professors.set(firstChar, [])
        }
        const arr = this.professors.get(firstChar)!
        const newProfessor = new Professor(name)
        // TODO: sort the array and use it to efficiently get items
        arr.push(newProfessor)
        return newProfessor
    }

    getMatches(name: string): Professor[] {
        const firstChar = name.charAt(0)
        if (!this.professors.has(firstChar)) return []
        const arr = this.professors.get(firstChar)!
        const returnArr = []
        for (const p of arr) {
            if (p.name.startsWith(name)) {
                returnArr.push(p)
            }
        }
        return returnArr
    }
}
