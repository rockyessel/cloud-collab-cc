import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { ResObj } from "@/interface";
import { toast } from "sonner";
import { isProduction } from "../config/pangea";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const baseURL = isProduction
  ? process.env.NEXT_PUBLIC_BASEURL
  : "${baseURL}";

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

export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
  try {
    const response = await fetch(
      `https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`
    );
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
};

export const handleCreateSession = async (session: any) => {
  try {
    const response = await fetch(`${baseURL}/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session }),
    });

    if (response.ok) {
      const result: ResObj = await response.json();
      console.log("Session created successfully:", result);
      return result;
    } else {
      console.error("Failed to create session:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating session:", error);
  }
};

export const downloadFile = async (fileUrl: string, fileName: string) => {
  try {
    // Display toast that the download is starting
    toast.info("File download started...");

    // Fetch the file
    const response = await fetch(fileUrl);

    // Check if the response is successful (status code in the range 200-299)
    if (response.ok) {
      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement("a");
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("File download completed!");
    } else {
      toast.error("Error downloading file.");
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    toast.error("Error downloading file.");
  }
};

export const scanFile = async (filePath: string) => {
  try {
    const response = await fetch(`${baseURL}/api/`);
  } catch (error) {
    console.log(error);
    toast.error(`Failed to scan. Error:${error}`);
  }
};
