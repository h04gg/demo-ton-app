import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";

export const Landing = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();

  console.log("wallet", wallet);
  return (
    <div className="mt-3">
      {userFriendlyAddress && (
        <div className="grid">
          <p className=" text-xl font-bold text-center">
            User Address: {userFriendlyAddress}
          </p>
          <span>Raw address: {rawAddress}</span>
        </div>
      )}

      {wallet && (
        <div>
          {/* <span>Connected wallet: {wallet.name}</span> */}
          <span>Device: {wallet.device.appName}</span>
        </div>
      )}
    </div>
  );
};
