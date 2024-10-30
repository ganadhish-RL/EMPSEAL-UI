import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Base from "../layout/base/Base";
import Home from "../pages/Home/Main";
import Swap from "../pages/swap/Main"
import BreadCrumb from "../components/BreadCrumb";
import NFTMarketplace from "../pages/Home/NFTMarketPlace";
function MyRoutes() {
  return (
    <>
      <BrowserRouter>
        {/* <Base> */}
        <div>
          <BreadCrumb />
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/swap" element={<Swap></Swap>}></Route>
            <Route path="/nft-marketplace" element={<NFTMarketplace></NFTMarketplace>}></Route>
          </Routes>
          </div>
        {/* </Base> */}
      </BrowserRouter>
    </>
  );
} 

export default MyRoutes;
