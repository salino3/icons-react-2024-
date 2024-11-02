import React, { useEffect, useState } from "react";

interface CustomIconProps {
  userToken: string;
  iconName: string;
  color?: string;
  shadow?: string;
  size?: number;
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  userToken,
  iconName,
  color = "#000",
  shadow = "none",
  size = 32,
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [iconSvg, setIconSvg] = useState("");

  useEffect(() => {
    // Mock de verificación de suscripción
    const verifySubscription = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/subscriptions?userToken=${userToken}`
        );
        const result = await response.json();
        setIsAuthorized(result[0]?.isSubscribed || false);
      } catch (error) {
        console.error("Authorization failed:", error);
        setIsAuthorized(false);
      }
    };

    verifySubscription();
  }, [userToken]);

  useEffect(() => {
    if (isAuthorized) {
      // Mock de carga del SVG desde el API
      fetch(`http://localhost:5000/icons?iconName=${iconName}`)
        .then((response) => response.json())
        .then((data) => setIconSvg(data[0]?.svg || ""));
    }
  }, [isAuthorized, iconName]);

  if (!isAuthorized) {
    return <div>Please subscribe to view this icon.</div>;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: iconSvg }}
      style={{
        width: size,
        height: size,
        fill: color,
        filter: shadow !== "none" ? `drop-shadow(${shadow})` : "none",
      }}
    />
  );
};
