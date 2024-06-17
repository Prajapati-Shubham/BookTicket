import { Route, Routes } from "react-router-dom";
import { colorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode, useEffect } from "react";
import Index from "./Components/MainPage/Index.jsx";
import Slider from "./Components/Includes/Slider.jsx";
import Topbar from "./Components/Includes/Topbar.jsx";
import AllMovies from "./Components/Movies/AllMovies.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import Auth from "./Components/Auth/Auth.jsx";
import { useSelector, useDispatch } from "react-redux";
import { userActions, adminActions } from "./store/index.jsx";
function App() {
  const dispatch = useDispatch();
  const [theme, colorMode] = useMode();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [])
  return (
    <>
      <colorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Slider />
            <main className="content">
              <Topbar />
              <StrictMode>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/movie" element={<AllMovies />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/auth" element={<Auth />} />
                </Routes>
              </StrictMode>
            </main>
          </div>
        </ThemeProvider>
      </colorModeContext.Provider>

    </>
  )
}



export default App
