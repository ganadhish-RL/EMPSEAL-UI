import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Base from "../layout/base/Base";
import Home from '../pages/Home/Main';
import Swap from '../pages/swap/Main';
import BreadCrumb from '../components/BreadCrumb';
import NFTMarketplace from '../pages/Home/NFTMarketPlace';
import CollectionDetail from '../components/CollectionDetail';
import ItemDetail from '../pages/Home/ItemDetail';
import Bridge from '../pages/bridge/Main';
import NativeBridge from '../pages/nativeBridge';

function MyRoutes() {
  return (
    <>
      <BrowserRouter>
        {/* <Base> */}
        <div>
          <BreadCrumb />
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/swap' element={<Swap></Swap>}></Route>
            <Route
              path='/nft-marketplace/:name'
              element={<CollectionDetail />}
            />
            <Route
              path='/nft-marketplace'
              element={<NFTMarketplace></NFTMarketplace>}
            ></Route>
            <Route
              path='/item-detail'
              element={<ItemDetail></ItemDetail>}
            ></Route>
            <Route path='/bridge' element={<Bridge></Bridge>}></Route>
            <Route
              path='/native-bridge'
              element={<NativeBridge></NativeBridge>}
            ></Route>
          </Routes>
        </div>
        {/* </Base> */}
      </BrowserRouter>
    </>
  );
}

export default MyRoutes;
