import { useState } from "react";
import SomeContext from "./SomeContext";
import styled from "styled-components";
import Home from "./Home";
import Colors from "./Paint";
import Gallery from "./Gallery";
import GalleryObject from "./GalleryObject";
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 42px;
  align-items: flex-start;
  background-color: #dbc3e5;
  height: 100vh;
`;

function App() {
  const [header, setHeader] = useState("Jump to a page");
  const [page, setPage] = useState(1);
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <Colors />, path: "/colors" },
        { element: <Gallery />, path: "/gallery" },
        { element: <GalleryObject />, path: "/gallery/:id" },
      ],
      element: (
        <>
          <Main>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/colors">Colors</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
              </ul>
            </nav>
            <Outlet context={[page, setPage]} />
          </Main>
        </>
      ),
    },
  ]);
  return (
    <SomeContext.Provider value={header}>
      <RouterProvider router={router} />
    </SomeContext.Provider>
  );
}
export default App;
