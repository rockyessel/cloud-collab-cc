import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatFileSize = (size: number): string => {
  const units = ["B", "KB", "MB", "GB"];
  let formattedSize = size;
  let unitIndex = 0;

  while (formattedSize >= 1024 && unitIndex < units.length - 1) {
    formattedSize /= 1024;
    unitIndex++;
  }

  return `${formattedSize?.toFixed(2)}${units[unitIndex]}`;
};

const shuffleString = (input: string): string => {
  const shuffleRatio = Math.random() * 0.8;
  let characters = input.split("");
  characters = characters.sort(() => Math.random() - shuffleRatio);
  return characters.join("");
};

export const IdGen = (type: string): string => {
  const characters = shuffleString(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  );
  const length = Math.floor(Math.random() * 6) + 5;
  const usedChars: string[] = [];
  let result = "";
  for (let i = 0; i < length; i++) {
    let index: number;
    do {
      index = Math.floor(Math.random() * characters.length);
    } while (usedChars.includes(characters[index]));
    result += characters[index];
    usedChars.push(characters[index]);
  }
  return `${type}_${result}`;
};

export const truncate = (str: string, num: number) => {
  if (!str) return "";
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
