import React, { useState } from 'react';
import Icon from '../../src/assets/images/emp-icon.svg';
import CollectionImage from '../../src/assets/images/collection-img1.svg';
import Grid from '../assets/images/grid-view.svg';
import List from '../assets/images/list-view.svg';
import { Link } from 'react-router-dom';

const CollectionDetailTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Milady #284',
      sales: 9.24,
      listingPrice: 0.032,
      floorDifference: -6.03,
      itemOwner: 14,
      listedTime: 8888,
    },
    {
      id: 2,
      name: 'Milady #837',
      sales: 9.24,
      listingPrice: 0.0262,
      floorDifference: -6.03,
      itemOwner: 14,
      listedTime: 8888,
    },
    {
      id: 3,
      name: 'Ayush',
      sales: 9.24,
      listingPrice: 0.0262,
      floorDifference: -6.03,
      itemOwner: 14,
      listedTime: 8888,
    },
    {
      id: 4,
      name: 'Kaus',
      sales: 9.24,
      listingPrice: 0.0262,
      floorDifference: -6.03,
      itemOwner: 14,
      listedTime: 8888,
    },
    // Add more items as needed
  ]);

  const [viewMode, setViewMode] = useState('list'); // Toggle between 'list' and 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsToShow, setRowsToShow] = useState(10);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="collection-container border_gradient p-5">
      {/* Header Section */}
      <header className="flex items-center justify-between text-white pb-4">
        <div className="flex items-center space-x-2">
          <img src="/path/to/logo.png" alt="Logo" className="h-8" />
          <span className="text-xl font-bold">MPX</span>
        </div>
        <div className="flex space-x-4 relative z-10">
          <button
            className={`text-sm py-1.5 px-3 rounded flex items-center roboto ${
              viewMode === 'list' ? 'bg-[#FF9900] text-black' : 'text-white'
            }`}
            onClick={() => setViewMode('list')}
          >
            <img className="pe-2" src={List} alt="List View" />
            List View
          </button>
          <button
            className={`text-sm py-1.5 px-3 rounded flex items-center roboto ${
              viewMode === 'grid' ? 'bg-[#FF9900] text-black' : 'text-white'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <img className="pe-2" src={Grid} alt="Grid View" />
            Grid View
          </button>
        </div>
      </header>

      {/* Main Content */}
      {viewMode === 'list' ? (
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="collection text-white roboto">
              <th className="bg-[#222222] text-left py-2 px-4 border border-gray-700">
                Item
              </th>
              <th className="bg-[#222222] text-right py-3 px-4 border border-gray-700">
                Listing Price
              </th>
              <th className="bg-[#222222] text-right py-3 px-4 border border-gray-700">
                Floor Difference
              </th>
              <th className="bg-[#222222] text-right py-2 px-4 border border-gray-700">
                Owner
              </th>
              <th className="bg-[#222222] text-right py-3 px-4 border border-gray-700">
                Listed Time
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, rowsToShow).map((item) => (
              <tr
                key={item.id}
                className="border border-gray-700 collection_row roboto"
              >
                <td className="py-4 px-4 flex items-center">
                  <img
                    className="pe-3"
                    src={CollectionImage}
                    alt={`${item.name} logo`}
                  />
                  <Link
                    to={`/nft-marketplace/${generateSlug(item.name)}`}
                    className=""
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="text-center py-2 px-4">{item.listingPrice}</td>
                <td className="text-center py-2 px-4">
                  <span
                    className={
                      item.floorDifference < 0
                        ? 'text-red-500'
                        : 'text-[#0CDD2E]'
                    }
                  >
                    {item.floorDifference}
                  </span>
                </td>
                <td className="text-center py-2 px-4">{item.itemOwner}</td>
                <td className="text-center py-2 px-4">{item.listedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredData.slice(0, rowsToShow).map((item) => (
            <div
              key={item.id}
              className="bg-[#222222] rounded p-4 text-white roboto"
            >
              <img
                src={CollectionImage}
                alt={item.name}
                className="rounded mb-4"
              />
              <h3 className="text-sm font-bold">{item.name}</h3>
              <p className="text-xs opacity-75">
                Price: {item.listingPrice.toFixed(4)}
              </p>
              <p className="text-xs opacity-75">
                Last Sale: {item.sales.toFixed(4)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex space-x-2 text-white mt-4 mb-4 roboto items-center relative z-10">
        <span className="text-xs opacity-60">Show Top</span>
        {[10, 20, 30].map((num) => (
          <button
            key={num}
            className={`px-3 py-1 text-xs ${
              rowsToShow === num
                ? 'bg-[#3F3F3F] text-white'
                : 'bg-[#222222] text-gray-300'
            }`}
            onClick={() => setRowsToShow(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollectionDetailTable;
