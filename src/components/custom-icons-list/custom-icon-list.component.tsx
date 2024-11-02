import React, { useEffect, useState } from "react";

interface Icon {
  iconName: string;
  title: string;
  svg: string;
}

interface CustomIconListProps {
  userToken: string;
  color?: string;
  shadow?: string;
  size?: number;
}

export const CustomIconList: React.FC<CustomIconListProps> = ({
  userToken,
  color = "#000",
  shadow = "none",
  size = 32,
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [icons, setIcons] = useState<Icon[]>([]);

  useEffect(() => {
    // Verificar la suscripción del usuario
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
      // Cargar iconos desde el API
      fetch("http://localhost:5000/icons")
        .then((response) => response.json())
        .then((data) => setIcons(data));
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return <div>Please subscribe to view these icons.</div>;
  }

  return (
    <div>
      {icons.map((icon) => (
        <div
          key={icon.iconName}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: icon.svg }}
            style={{
              width: size,
              height: size,
              fill: color,
              filter: shadow !== "none" ? `drop-shadow(${shadow})` : "none",
              marginRight: "8px",
            }}
          />
          <h3>{icon.title}</h3>
        </div>
      ))}
    </div>
  );
};
