import styled from "styled-components";
import Home from "./Home";
import Colors from "./Colors";
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
  /* justify-content: center; */
  padding: 42px;
  align-items: flex-start;
  background-color: #dbc3e5;
  width: 100%;
  height: 100vh;
`;

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <Colors />, path: "/colors" },
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
