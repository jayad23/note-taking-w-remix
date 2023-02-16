import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import baseStyles from "./styles/main.css";
import MainNavigation from "./components/main-navigation/MainNavigation";

export const meta = ({ title }) => ({
  charset: "utf-8",
  title,
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => ([
  { rel: "stylesheet", href: baseStyles }
])

const Layout = ({ title, children }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
};
export default function App() {
  return (
    <Layout title="Notes - Learning with Remix">
      <Outlet />
    </Layout>
  );
};

export const ErrorBoundary = ({ error }) => {
  return (
    <Layout title="An Error Ocurred">
      <main className="error">
        <p>Oh no!</p>
        <p>{error.message}</p>
        <p>Back to <Link to="/">safety</Link></p>
      </main>
    </Layout>
  );
}

export const CatchBoundary = () => {
  const error = useCatch();
  return (
    <Layout title="Bad Request">
      <main className="error">
        <p>Oh no root boundart!</p>
        <p>{error.data?.message || "An Error Ocurred!"}</p>
        <p>{error.statusText}</p>
        <p>Back to <Link to="/">safety</Link></p>
      </main>
    </Layout>
  )
}