import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { UserInfo } from "../UserInfo/UserInfo";

export const Landing = () => {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionLink, setTransactionLink] = useState<string | null>(null);

  const transaction: SendTransactionRequest = {
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    messages: [
      {
        address: address,
        amount: amount,
      },
    ],
  };

  const fetchTransactions = async (address: string) => {
    try {
      const response = await fetch(
        `https://testnet.toncenter.com/api/v2/getTransactions?address=${address}`
      );
      const data = await response.json();
      if (data && data.result && data.result.length > 0) {
        const latestTransaction = data.result[0]; // Latest transaction
        console.log("Latest transaction:", latestTransaction);
        return latestTransaction;
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    return null;
  };

  const handleSendTransaction = async () => {
    try {
      await tonConnectUI.sendTransaction(transaction);
      const latestTransaction = await fetchTransactions(address!);
      if (latestTransaction && latestTransaction.transaction_id) {
        setTransactionLink(
          `https://testnet.tonviewer.com/transaction/${latestTransaction.transaction_id.hash}`
        );
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const isButtonDisabled = !address || !amount || Number(amount) <= 0;

  return (
    <div className="mt-3">
      <UserInfo />

      <div className="mt-4 border rounded-xl p-4 mx-5">
        <div className="mb-4">
          <label className="block text-sm text-start font-medium text-gray-700">
            Recipient Address:
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter recipient address"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-start font-medium text-gray-700">
            Amount:
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter amount"
          />
        </div>

        <button
          className={`mt-4 border rounded-xl p-4 ${
            isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleSendTransaction}
          //   onClick={() => tonConnectUI.sendTransaction(transaction)}
          disabled={isButtonDisabled}
        >
          Send transaction
        </button>

        {transactionLink && (
          <div className="mt-4">
            <p>Transaction successfully sent!</p>
            <a
              href={transactionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Transaction on Explorer
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
