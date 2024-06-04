import { useState } from "react";
import SomeContext from "./SomeContext";
import Home from "./components/Home";
import Colors from "./components/Paint";
import Gallery from "./components/Gallery";
import GalleryObject from "./components/GalleryObject";
import { StyledMain } from "./styled-components/Main.styled";
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App() {
  const [header, setHeader] = useState("Jump to a page");
  const [page, setPage] = useState(1);
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <Colors />, path: "/paint" },
        { element: <Gallery />, path: "/gallery" },
        { element: <GalleryObject />, path: "/gallery/:id" },
      ],
      element: (
        <>
          <StyledMain>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/paint">Paint</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
              </ul>
            </nav>
            <Outlet context={[page, setPage]} />
          </StyledMain>
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
