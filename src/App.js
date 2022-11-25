import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
// import HomePage from "./pages/HomePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";
// import MoviePage from "./pages/MoviePage";
// import MoviePageV2 from "./pages/MoviePageV2";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
// const MoviePageV2 = lazy(() => import("./pages/MoviePageV2"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
          <Route path="*" element={<>Not Found</>}></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
