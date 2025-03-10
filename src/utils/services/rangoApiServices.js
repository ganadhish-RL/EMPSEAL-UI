/* 
const BASE_URL = 'https://api.rango.exchange';

const fetchApi = async (endpoint, body) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?apiKey=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error);
    throw error;
  }
};

export const confirmRouting = async (requestId, destination, checkPrerequisites) => {
  return fetchApi('/routing/confirm', { requestId, destination, checkPrerequisites });
};

export const createTransaction = async (requestId, step, userSettings, validations) => {
  return fetchApi('/tx/create', { requestId, step, userSettings, validations });
};

export const checkTransactionStatus = async (requestId, txId, step) => {
  return fetchApi('/tx/check-status', { requestId, txId, step });
};
 */

// async function testAPI() {
//     let response;
//     const payload = {
//         requestId: "be392266-f19d-4aea-8550-cd6917f2bed5",
//         destination: "0x05F8cC8753D90d67DBB8c02118440b8283F941c9",
//         checkPrerequisites: false,
//     }
//     const confirmRangoRoute = await fetch(`https://api.rango.exchange/routing/confirm?apiKey=502332d9-7033-4fd7-bad8-7a751b389c16`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//     });

//     console.log("confirmRangoRoute: ", confirmRangoRoute);

// const txPayload = {
//     userSettings: { slippage: 1 },
//     validations: { balance: true, fee: true, approve: true },
//     requestId: 'be392266-f19d-4aea-8550-cd6917f2bed5',
//     step: 1,
// }

//     const transactionOptions = {
//         method: 'POST',
//         headers: {
//           accept: '*/*',
//           'content-type': 'application/json',
//         },
//         body: JSON.stringify(txPayload),
//       };

//       response = await fetch(`https://api.rango.exchange/tx/create?apiKey=502332d9-7033-4fd7-bad8-7a751b389c16`, transactionOptions);
    
//     console.log('Transaction Confirm: ',response );

// }

// testAPI();