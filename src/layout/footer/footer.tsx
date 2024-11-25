import { Locales, useTonConnectUI } from "@tonconnect/ui-react";

export const Footer = () => {
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const onLanguageChange = (language: Locales) => {
    setOptions({ language });
  };
  return (
    <div className="text-xl flex justify-between px-3 items-center bg-gray-150 py-2">
      <div>
        <label>Language</label>
        <select onChange={(e) => onLanguageChange(e.target.value as Locales)}>
          <option value="en">en</option>
          <option value="ru">ru</option>
        </select>
      </div>
    </div>
  );
};
