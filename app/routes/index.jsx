import { Link } from "@remix-run/react";
import homeStyles from "../styles/home.css";
export const links = () => ([
  { rel: "stylesheet", href: homeStyles }
])
export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keepoing track of your notes</h1>
      <p>Try our early beta and never loose track of your notes again!</p>
      <p id="cta">
        <Link to="/notes">Try now!</Link>
      </p>
    </main>
  );
}
