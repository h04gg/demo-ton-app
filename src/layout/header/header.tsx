import { TonConnectButton } from "@tonconnect/ui-react";

export const Header = () => {
  return (
    <div className="text-xl flex justify-between px-3 items-center bg-gray-150 py-2">
      <span className="font-bold">DEMO APP</span>
      <TonConnectButton />
    </div>
  );
};
