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

import { SerializedSubject } from "./components/SubjectManager"

interface DatosAnio {
    [nombre: string]: Curso,
}

interface Curso {
    nombre: string,
    abreviado: string,
    Teoria: {
        [grupo: string]: DatosGrupo,
    },
    Laboratorio?: {
        [grupo: string]: DatosGrupo,
    },
}

interface DatosGrupo {
    Docente: string,
    Horas: string[]
}

export function horariosUnsaAdapter(input: {[k: string]: SerializedSubject}): DatosAnio {
    const o: DatosAnio = {}
    for (const k in input) {
        const subject = input[k]

        const gruposTeoria: {[k: string]: DatosGrupo} = {}
        for (const group of subject.groups) {
            gruposTeoria[group.letter] = {
                Docente: group.professor,
                Horas: group.hours.map(({day, hour}) => {
                    const p1 = hour.substring(0, 2)
                    const p2 = hour.substring(3, 5)
                    return `${day.substring(0, 2)}${p1}${p2}`
                }),
            }
        }

        const c: Curso = {
            nombre: subject.fullName,
            abreviado: subject.name,
            Teoria: gruposTeoria,
        }

        if (subject.labGroups.length > 0) {
            const gruposL: {[k: string]: DatosGrupo} = {}
            for (const group of subject.labGroups) {
                gruposL[group.letter] = {
                    Docente: group.professor,
                    Horas: group.hours.map(({day, hour}) => {
                        const p1 = hour.substring(0, 2)
                        const p2 = hour.substring(3, 5)
                        return `${day.substring(0, 2)}${p1}${p2}`
                    }),
                }
            }
            c.Laboratorio = gruposL
        }

        o[subject.name] = c
    }
    return o
}

