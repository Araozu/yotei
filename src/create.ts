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

import "normalize.css"
import "./styles/global.css"
import { Header } from "./components/Header"
import { Y } from "./YElem/YElem"
import { Table } from "./components/Table"
import { CLI } from "./components/CLI"
import { SelectableTableManager } from "./components/TableManager"
import { SubjectManager } from "./components/SubjectManager"
import { horariosUnsaAdapter } from "./HorariosUnsaAdapter"

const app = document.querySelector<HTMLDivElement>("#app")!
const tableManager = new SelectableTableManager()
const subjectManager = new SubjectManager()

const printButton = Y.button(null, "Serialize")
printButton.getInstance().addEventListener("click", () => {
    console.log(JSON.stringify(horariosUnsaAdapter(subjectManager.getSerializableObject())))
})

const tree = Y.div(null, [
    new Header(false),
    Y.br(),
    new Table(tableManager),
    printButton,
    new CLI(tableManager, subjectManager),
])
app.appendChild(tree.getInstance())
