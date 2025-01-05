import React, { useState, useEffect, useRef } from "react";
// Helper function to calculate slippage
const calculateSlippage = (amountOut, slippagePercent) => {
  if (slippagePercent < 0.5 || slippagePercent > 5) {
    throw new Error("Invalid slippage percentage. Must be between 0.5 and 5");
  }
  return (
    (amountOut * BigInt(10000 - Math.round(slippagePercent * 100))) /
    BigInt(10000)
  );
};

const SlippageCalculator = ({ tradeInfo, onSlippageCalculated, onClose }) => {
  const [slippage, setSlippage] = useState(0.5);
  const [customSlippage, setCustomSlippage] = useState("");
  const [slippageApplied, setSlippageApplied] = useState(false);
  const originalAmountRef = useRef(null);
  const modalRef = useRef(null);

  // Store original amount when tradeInfo changes and ref is empty
  useEffect(() => {
    if (tradeInfo?.amountOut && !originalAmountRef.current) {
      originalAmountRef.current = tradeInfo.amountOut;
    }
  }, [tradeInfo?.amountOut]);

  // Calculate slippage when necessary
  useEffect(() => {
    if (
      originalAmountRef.current &&
      slippage >= 0.5 &&
      slippage <= 5 &&
      !slippageApplied
    ) {
      try {
        // Always calculate based on original amount
        const adjustedAmount = calculateSlippage(
          originalAmountRef.current,
          slippage
        );
        onSlippageCalculated(adjustedAmount);
        setSlippageApplied(true);
      } catch (error) {
        console.error("Error calculating slippage:", error);
      }
    }
  }, [slippage, onSlippageCalculated, slippageApplied]);

  // Handle slippage option selection
  const handleSlippageSelect = (value) => {
    if (slippage !== value) {
      setSlippage(value);
      setCustomSlippage(value.toString());
      setSlippageApplied(false);
    }
  };

  // Handle custom slippage input change
  const handleCustomSlippageChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setCustomSlippage("");
      return;
    }

    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0.5 || value > 5) return;

    setCustomSlippage(inputValue);
    setSlippage(value);
    setSlippageApplied(false);
  };

  // Reset slippage state and calculate immediately
  const handleResetSlippage = () => {
    if (originalAmountRef.current) {
      try {
        const defaultSlippage = 0.5;
        const adjustedAmount = calculateSlippage(
          originalAmountRef.current,
          defaultSlippage
        );
        onSlippageCalculated(adjustedAmount);
        setSlippage(defaultSlippage);
        setCustomSlippage("");
        setSlippageApplied(true);
      } catch (error) {
        console.error("Error resetting slippage:", error);
      }
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setSlippageApplied(false);
    originalAmountRef.current = null; // Reset the original amount reference
    onClose();
  };

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleModalClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const slippageOptions = [0.5, 1.0, 2.0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-black border border-white rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-white text-xl font-bold mb-4">Slippage Settings</h2>

        <div className="flex gap-2 items-center">
          {slippageOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSlippageSelect(option)}
              className={`px-4 py-1.5 rounded ${
                slippage === option
                  ? "bg-[#FF9900] text-black"
                  : "bg-[#161616] text-gray-300 hover:bg-gray-600"
              }`}
            >
              {option}%
            </button>
          ))}

          <input
            type="text"
            inputMode="decimal"
            value={customSlippage}
            onChange={handleCustomSlippageChange}
            className="w-16 px-2 py-1 rounded bg-[#161616] text-white text-center focus:outline-none border border-white"
            placeholder="%"
          />
        </div>

        <div className="flex justify-between mt-4">
          {/* Reset button */}
          <button
            onClick={handleResetSlippage}
            className="px-4 py-1 bg-[#FF9900] text-black rounded border-[2px] border-[#FF9900] roboto"
          >
            Reset Slippage
          </button>

          {/* Close button */}
          <button
            onClick={handleModalClose}
            className="px-4 py-1 bg-black text-white rounded border-[2px] border-[#FF9900] roboto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlippageCalculator;
