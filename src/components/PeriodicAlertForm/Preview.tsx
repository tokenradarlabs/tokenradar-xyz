import React from "react";

type PreviewProps = {
  channel: string;
  webhook: string;
  discordBot: string;
  coin: string;
  condition: string;
  price: string;
  currency: string;
  exchange: string;
};

export const Preview: React.FC<PreviewProps> = ({
  channel, webhook, discordBot, coin, condition, price, currency, exchange,
}) => {
  return (
    <div className="p-4 border rounded-lg bg-[#1a1d2e] text-gray-200">
      <h3 className="text-lg font-semibold mb-2">Alert Preview</h3>
      <p><strong>Channel:</strong> {channel}</p>
      {channel === "webhook" && <p><strong>Webhook:</strong> {webhook}</p>}
      {channel === "discord" && <p><strong>Discord Bot:</strong> {discordBot ? "Set" : "Not Set"}</p>}
      <p><strong>Coin:</strong> {coin}</p>
      <p><strong>Condition:</strong> {condition}</p>
      <p><strong>Price:</strong> {price} {currency}</p>
      <p><strong>Exchange:</strong> {exchange}</p>
    </div>
  );
};
