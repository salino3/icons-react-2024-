import React, { useEffect, useState } from "react";
import "./custom-icon-list.styles.scss";

interface Icon {
  iconName: string;
  title: string;
  svg: string;
}

interface CustomIconListProps {
  userToken: string;
  iconName: string;
  color?: string;
  shadow?: string;
  size?: number;
}

export const CustomIconList: React.FC<CustomIconListProps> = ({
  userToken,
  iconName,
  color = "#000",
  shadow = "none",
  size = 32,
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [icon, setIcon] = useState<Icon | null>(null);

  // Función para escalar los puntos del polígono
  const scalePolygonPoints = (points: string, scale: number) => {
    return points
      .split(" ")
      .map((point) => {
        const coords = point.split(",").map((coord) => {
          const value = parseFloat(coord);
          if (isNaN(value)) {
            console.warn(`Invalid coordinate found: ${coord}`); // Agrega un aviso para coordenadas inválidas
            return "0"; // Retorna "0" si no se puede convertir
          }
          return (value * scale).toFixed(2);
        });
        return coords.join(",");
      })
      .join(" ");
  };

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        const response = await fetch("http://localhost:5000/subscriptions");
        const subscriptions = await response.json();

        const userSubscription = subscriptions.find(
          (sub: { userToken: string }) => sub.userToken === userToken
        );

        if (userSubscription && userSubscription.isSubscribed) {
          setIsAuthorized(userSubscription.allowedIcons.includes(iconName));
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        setIsAuthorized(false);
      }
    };

    verifySubscription();
  }, [userToken, iconName]);

  useEffect(() => {
    if (isAuthorized) {
      fetch(`http://localhost:5000/icons?iconName=${iconName}`)
        .then((response) => response.json())
        .then((data) => setIcon(data[0] || null)); // Obtener solo el icono especificado
    }
  }, [isAuthorized, iconName]);

  if (!isAuthorized) {
    return <div>Please subscribe to view this icon.</div>;
  }

  return (
    icon && (
      <div
        className="cutom-icon-gogolenicon-22"
        style={{
          color: color,
          filter: shadow !== "none" ? `drop-shadow(${shadow})` : "none",
        }}
        dangerouslySetInnerHTML={{
          __html: icon.svg
            .replace(/<svg /, `<svg width="${"64"}" height="${"55"}" `) // Establecer el tamaño en el SVG
            .replace(/points='([^']+)'/, (match, p1) => {
              const scale = size / 100; // Escala basado en el tamaño proporcionado
              const scaledPoints = scalePolygonPoints(p1, scale);
              return `points='${scaledPoints}'`; // Asegúrate de usar comillas simples
            }),
        }}
      />
    )
  );
};
