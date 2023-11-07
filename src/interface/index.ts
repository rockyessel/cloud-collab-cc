import { ReactNode } from "react";

export interface LayoutProps {
    children :ReactNode
}

export interface InitialOrganizationData {
  logo: string;
  name: string;
  description: string;
  owner: string;
  members: string[];
  files: string[];
}

export interface UserProps {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  password: string;
  role: string;
  authType: string;
  isActive: boolean;
}


export interface FileProps {
  userId: string;
  folderId: string;
  url: string;
  proxyURL: string;
  size: string;
  originalFilename: string;
  mimeType: string;
  extension: string;
  sanityCMSId: string;
  sharableCode: string;
  sharableTo: string[];
  isSharable: boolean;
}



export interface FolderProps {
  _id: string;
  userId: string;
  name: string;
  note: string;
  files: string[];
  isSharable: boolean;
  sharableTo: string[];
}


export type ResObj = { msg: string; success: boolean; data: any };
