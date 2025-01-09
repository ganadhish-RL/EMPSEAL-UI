import { Address, erc20Abi, formatUnits, parseGwei } from "viem";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { toast } from "react-toastify";
import { SwapStatus, TradeInfo } from "./types/interface";
import { WPLS } from "./abis/wplsABI";
import { config } from "../Wagmi/config";
import { EMPSEALROUTERABI } from "./abis/empSealRouterAbi";
import Tokens from "../pages/tokenList.json";
import { convertToBigInt } from "./utils";
const RouterAddress = "0x0Cf6D948Cf09ac83a6bf40C7AD7b44657A9F2A52";
const WETH_ADDRESS: Address = "0xa1077a294dde1b09bb078844df40758a5d0f9a27";
const EMPTY_ADDRESS: Address = "0x0000000000000000000000000000000000000000";

const checkAllowance = async (tokenInAddress: string, userAddress: Address) => {
  try {
    let result = await readContract(config, {
      abi: erc20Abi,
      address: tokenInAddress as Address,
      functionName: "allowance",
      args: [userAddress, RouterAddress],
    });
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const callApprove = async (tokenInAddress: string, amountIn: bigint) => {
  try {
    let result = await writeContract(config, {
      abi: erc20Abi,
      address: tokenInAddress as Address,
      functionName: "approve",
      args: [RouterAddress, amountIn],
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const swapFromEth = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: EMPSEALROUTERABI,
      address: RouterAddress,
      functionName: "swapNoSplitFromPLS",
      args: [
        {
          adapters: tradeInfo.adapters,
          amountIn: tradeInfo.amountIn,
          amountOut: tradeInfo.amountOut,
          // amountOut: BigInt("0"),
          path: tradeInfo.path,
        },
        userAddress,
        BigInt("30"),
      ],
      value: tradeInfo.amountIn,
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    console.log("error", e);
    throw e;
  }
};

const swapToEth = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: EMPSEALROUTERABI,
      address: RouterAddress,
      functionName: "swapNoSplitToPLS",
      args: [
        {
          adapters: tradeInfo.adapters,
          amountIn: tradeInfo.amountIn,
          amountOut: tradeInfo.amountOut,
          path: tradeInfo.path,
        },
        userAddress,
        BigInt("30"),
      ],
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const swapNoSplitToEth = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: WPLS,
      address: WETH_ADDRESS,
      functionName: "withdraw",
      args: [tradeInfo.amountIn],
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const swapNoSplitFromEth = async (
  tradeInfo: TradeInfo,
  userAddress: Address
) => {
  try {
    let result = await writeContract(config, {
      abi: WPLS,
      address: WETH_ADDRESS,
      functionName: "deposit",
      args: [],
      value: tradeInfo.amountIn,
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const swap = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: EMPSEALROUTERABI,
      address: RouterAddress,
      functionName: "swapNoSplit",
      args: [
        {
          adapters: tradeInfo.adapters,
          amountIn: tradeInfo.amountIn,
          // amountOut: BigInt("0"),
          amountOut: tradeInfo.amountOut,
          // amounts[tradeInfo.amounts.length - 1],
          // amountOut: (tradeInfo.amountOut * BigInt(10)) / BigInt(10000),
          path: tradeInfo.path,
        },
        userAddress,
        BigInt("30"),
      ],
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const waitForTransaction = async (hash: Address) => {
  try {
    const transactionReceipt = await waitForTransactionReceipt(config, {
      confirmations: 2,
      hash,
    });
    if (transactionReceipt.status === "success") {
      return {
        success: true,
        data: transactionReceipt,
      };
    }
    throw transactionReceipt.status;
  } catch (e: any) {
    throw e;
  }
};

export const swapTokens = async (
  setStatus: (status: SwapStatus) => void,
  setSwapHash: (hash: string) => void,
  tokenInAddress: Address,
  tokenOutAddress: Address,
  userAddress: Address,
  tradeInfo: TradeInfo
) => {
  try {
    setStatus("LOADING");
    const defaultResponse = {
      success: false,
      data: EMPTY_ADDRESS,
    };
    let swapResponse = defaultResponse;
    if (tokenInAddress !== EMPTY_ADDRESS) {
      const approvedTokens = await checkAllowance(tokenInAddress, userAddress);
      if (approvedTokens.data < tradeInfo.amountIn) {
        try {
          setStatus("APPROVING");
          await callApprove(tokenInAddress, tradeInfo.amountIn);
          setStatus("APPROVED");
          toast.success("Token approved! Ready to confirm the transaction.");
        } catch (error) {
          setStatus("ERROR");
          console.error("Approval failed:", error);
          toast.error("Token approval failed");
          throw error; // Rethrow if necessary for further error handling
        }
      }
    }
    // setStatus("APPROVED");
    setStatus("SWAPPING");
    if (tokenInAddress === EMPTY_ADDRESS && tokenOutAddress === WETH_ADDRESS) {
      swapResponse = await swapNoSplitFromEth(tradeInfo, userAddress);
    } else if (
      tokenInAddress === WETH_ADDRESS &&
      tokenOutAddress === EMPTY_ADDRESS
    ) {
      swapResponse = await swapNoSplitToEth(tradeInfo, userAddress);
    } else if (tokenInAddress === EMPTY_ADDRESS) {
      swapResponse = await swapFromEth(tradeInfo, userAddress);
    } else if (tokenOutAddress === EMPTY_ADDRESS) {
      swapResponse = await swapToEth(tradeInfo, userAddress);
    } else {
      swapResponse = await swap(tradeInfo, userAddress);
      toast.success("Transaction Successful");
    }
    setStatus("SWAPPED");
    setSwapHash(swapResponse.data);
    return swapResponse;
  } catch (error) {
    if (
      error.message &&
      error.message.includes("EmpsealRouter: Insufficient output amount")
    ) {
      setStatus("ERROR");
      toast.error("Output amount too high. Adjust slippage and retry.");
    } else {
      setStatus("ERROR");
      toast.error("Transaction rejected");
    }
    throw error;
  }
};
