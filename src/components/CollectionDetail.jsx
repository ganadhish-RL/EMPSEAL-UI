import React from 'react';
import { useParams } from 'react-router-dom';
import Image from '../assets/images/collection_detail.svg';
import Twitter from '../assets/images/profile_twitter.svg';
import Discord from '../assets/images/profile_discord.svg';
import Globe from '../assets/images/profile_globe.svg';
import Link from '../assets/images/profile_link.svg';

const CollectionDetail = () => {
  const { name } = useParams();

  return (
    <div className="md:container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border_gradient p-4 ">
            <div className="col-span-3 roboto relative z-10">
              <div className="text-white">
                {/* Profile Image */}
                <div className="w rounded-lg overflow-hidden">
                  <img
                    src={Image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  {/* Name and Social Icons */}
                  <div className="flex items-center justify-between space-x-2 mb-4 mt-1">
                    <h2 className="text-xs font-semibold">
                      {name.replace(/-/g, ' ')}
                    </h2>
                    <span className="text-[#FF9900]">★</span>
                  </div>
                  <div className="flex space-x-4 text-gray-400">
                    <a href="#">
                      <img src={Twitter} alt="twitter"></img>
                    </a>
                    <a href="#">
                    <img src={Discord} alt="discord"></img>
                    </a>
                    <a href="#">
                    <img src={Globe} alt="globe"></img>
                    </a>
                    <a href="#">
                    <img src={Link} alt="link"></img>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Stats Section */}
            <div className="col-span-9 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 roboto">
                <div className="bg-[#222222] p-5 rounded-lg shadow-md text-xs text-center">
                  <h3 className="text-white">Floor Price</h3>
                  <p className="text-[#FF9900] font-semibold mt-1">220</p>
                </div>
                <div className="bg-[#222222] p-5 rounded-lg shadow-md text-xs text-center">
                  <h3 className="text-white">Total Volume</h3>
                  <p className="text-[#FF9900] font-semibold mt-1">
                    6,256,460.45
                  </p>
                </div>
                <div className="bg-[#222222] p-5 rounded-lg shadow-md text-xs text-center">
                  <h3 className="text-white">24hr Volume</h3>
                  <p className="text-[#FF9900] font-semibold mt-1">810</p>
                </div>
                <div className="bg-[#222222] p-5 rounded-lg shadow-md text-xs text-center">
                  <h3 className="text-white">Item</h3>
                  <p className="text-[#FF9900] font-semibold mt-1">$450</p>
                </div>
                <div className="bg-[#222222] p-5 rounded-lg shadow-md text-xs text-center">
                  <h3 className="text-white">Listed</h3>
                  <p className="text-[#FF9900]  font-semibold mt-1">165</p>
                </div>
                <div className="bg-[#222222] p-5 rounded-lg shadow-md text-xs text-center">
                  <h3 className="text-white">Owners</h3>
                  <p className="text-[#FF9900] font-semibold mt-1">3,240</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-700 rounded-lg p-4 bg-gray-900 max-w-md mx-auto text-white">
    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Activity</h2>
        <select className="bg-gray-800 text-white text-sm rounded px-2 py-1">
            <option value="all">All</option>
            {/* Add more options as needed */}
        </select>
    </div>

    <table className="mt-4 w-full text-sm">
        <thead>
            <tr className="text-gray-400">
                <th className="py-2 text-left">Time</th>
                <th className="py-2 text-left">Item</th>
                <th className="py-2 text-left">Price</th>
                <th className="py-2 text-left">Seller</th>
                <th className="py-2 text-right">Action</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
            {[...Array(5)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-800 transition">
                    <td className="py-2 text-gray-400">{index * 2 + 16}m</td>
                    <td className="py-2">
                        <div className="w-10 h-10 bg-cover rounded-md" style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }}></div>
                    </td>
                    <td className="py-2">02.3K Ξ</td>
                    <td className="py-2 text-yellow-500">a767F</td>
                    <td className="py-2 text-right">
                        <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">BUY</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

        </div>

       
      </div>
    </div>
  );
};

export default CollectionDetail;
