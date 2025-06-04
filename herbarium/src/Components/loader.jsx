import React, { useEffect, useState } from "react";
import "../Style/Loader.css"; // CSS for binary-style loader

export default function Loader() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsActive(true);
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`loader ${isActive ? "JS_on" : ""}`}>
      <div className="binary" />
      <div className="binary" />
      <span className="getting-there">Loading Virtual Garden...</span>
    </div>
  );
}
