import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Base from "../layout/base/Base";
import Home from "../pages/Home/Main";
import Swap from "../pages/swap/Main"
function MyRoutes() {
  return (
    <>
      <BrowserRouter>
        {/* <Base> */}
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/swap" element={<Swap></Swap>}></Route>
          </Routes>
        {/* </Base> */}
      </BrowserRouter>
    </>
  );
}

export default MyRoutes;
