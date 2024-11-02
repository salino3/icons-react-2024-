import React, { useEffect, useRef, useState } from "react";
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
  customStyles?: string;
}

export const CustomIconList: React.FC<CustomIconListProps> = ({
  userToken,
  iconName,
  color = "black",
  shadow = "none",
  size = 32,
  customStyles,
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [icon, setIcon] = useState<Icon | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        .then((data) => setIcon(data[0] || null))
        .catch((error) => console.error("Error fetching icon:", error));
    }
  }, [isAuthorized, iconName]);

  const svgToDataUrl = (svg: string, color: string): string => {
    const modifiedSvg = svg
      .replace(/fill='currentColor'/g, `fill="${color}"`)
      .replace(/fill=""/g, `fill="${color}"`);

    const encodedSVG = encodeURIComponent(modifiedSvg).replace(/%20/g, " ");
    return `data:image/svg+xml;charset=utf-8,${encodedSVG}`;
  };

  useEffect(() => {
    if (icon && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      const iconSvgDataUrl = svgToDataUrl(icon.svg, color);

      img.onload = () => {
        if (canvasRef.current) {
          const aspectRatio = img.height / img.width;
          const height = size * aspectRatio;

          canvasRef.current.width = size;
          canvasRef.current.height = height;

          ctx?.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          ctx?.drawImage(img, 0, 0, size, height);
        }
      };

      img.src = iconSvgDataUrl;
    }
  }, [icon, color, size]);

  if (!isAuthorized) {
    return <div>Please subscribe to view this icon.</div>;
  }

  return (
    icon && (
      <canvas
        className={customStyles}
        style={{
          filter: shadow !== "none" ? `drop-shadow(${shadow})` : "none",
          pointerEvents: "none",
        }}
        ref={canvasRef}
        draggable={"false"}
        width={size}
      />
    )
  );
};
