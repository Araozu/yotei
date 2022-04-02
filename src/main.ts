import "normalize.css"
import "./styles/global.css"
import { Header } from "./components/Header"

const app = document.querySelector<HTMLDivElement>("#app")!
const header = new Header()
app.appendChild(header.getInstance())
