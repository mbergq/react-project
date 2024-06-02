import styled from "styled-components";
import Home from "./Home";
import Colors from "./Colors";
import Test from "./Gallery";
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
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <Colors />, path: "/colors" },
        { element: <Test />, path: "/test" },
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
                  <Link to="/test">Test</Link>
                </li>
              </ul>
            </nav>
            <Outlet />
          </Main>
        </>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
