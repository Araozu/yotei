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

type YChildren = (YElem | string)[] | string | YElem

export class YElem {
    private instance: HTMLElement

    constructor(element: HTMLElement | YElem) {
        if (element instanceof YElem) {
            this.instance = element.instance
        } else {
            this.instance = element
        }
    }

    add(options?: Record<string, string> | null, children?: YChildren): YElem {
        if (options) {
            for (const optionsKey in options) {
                console.log("Appending", optionsKey, options[optionsKey])
                // @ts-ignore
                this.instance[optionsKey] = options[optionsKey]
            }
        }
        if (children) {
            if (Array.isArray(children)) {
                for (const child of children) {
                    if (child instanceof YElem) {
                        this.instance.appendChild(child.getInstance())
                    } else {
                        this.instance.appendChild(document.createTextNode(child))
                    }
                }
            } else if (children instanceof YElem) {
                this.instance.appendChild(children.getInstance())
            } else {
                this.instance.appendChild(document.createTextNode(children))
            }
        }
        return this
    }

    /**
     * Renders this element
     */
    getInstance(): HTMLElement {
        return this.instance
    }
}

type YFunction = (options?: Record<string, string>, children?: YChildren) => YElem

function yFunGen(elem: string): YFunction {
    return function(options, children) {
        return new YElem(document.createElement(elem)).add(options, children)
    }
}

type elements = "div" | "h1" | "span" | "br" | "p" | "a" | "button" | "img"
type YElements = Record<elements, YFunction>
const htmlElems: elements[] = ["div", "h1", "span", "br", "p", "a", "button", "img"]

const YHtmlElems = {} as YElements
for (const htmlElem of htmlElems) {
    YHtmlElems[htmlElem] = yFunGen(htmlElem)
}

export const Y = Object.freeze(YHtmlElems)
