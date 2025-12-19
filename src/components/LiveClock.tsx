"use client";

import { useEffect, useState } from "react";

const GMT_OFFSET = 1;

function formatTime(date: Date) {
  const hours = (date.getUTCHours() + GMT_OFFSET + 24) % 24;
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const hh = String(hours);
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function LiveClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <span>{time} GMT+1</span>;
}
