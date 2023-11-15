import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  params?: { id: string };
}

export interface InitialOrganizationData {
  _id?: string;
  logo: string;
  name: string;
  website: string;
  description: string;
  owner: string;
  members: string[];
  files: string[];
}

// export interface UserAuth {
//   id: string;
//   name: string;
//   username: string;
//   email: string;
//   image: string;
//   password: string;
//   role: string;
//   authType: string;
//   isActive: boolean;
// }

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
  _id?: string;
  organizationId: string;
  name: string;
  description: string;
  files: string[];
  isAllowed: boolean;
  allowedOrganisations: string[];
}

export interface FileProps {
  _id: string;
  organizationId: string;
  folderId: string;
  proxyURL: string;
  uploadedBy: string;
  localId: string;
  hash: string;
  score: string;
  size: string;
  originalFilename: string;
  mimeType: string;
  extension: string;
  sanityCMSId: string;
  fileUrl: string;
  allowedOrganisations: string[];
  isAllowed: boolean;
}

export type ResObj = { msg: string; success: boolean; data: any };

export interface UserProps {
  email: string;
  profile: {
    "Last-Login-City": string;
    "Last-Login-Country": string;
    "Last-Login-Time": string;
    "Login-From": string;
    "Login-Time": string;
    "User-Agent": string;
    first_name: string;
    last_name: string;
  };
  active_token: {
    token: string;
    id: string;
    type: string;
    life: number;
    expire: string;
    identity: string;
    created_at: string;
  };
  refresh_token: {
    token: string;
    id: string;
    type: string;
    life: number;
    expire: string;
    identity: string;
    created_at: string;
  };
}

export interface UserResponse {
  request_id: string;
  request_time: string;
  response_time: string;
  status: string;
  summary: string;
  result: {
    id: string;
    type: string;
    life: number;
    expire: string;
    identity: string;
    email: string;
    profile: {
      "Last-Login-City": string;
      "Last-Login-Country": string;
      "Last-Login-Time": string;
      "Login-From": string;
      "Login-Time": string;
      "User-Agent": string;
      first_name: string;
      last_name: string;
    };
    created_at: string;
  };
}

export interface SessionProps {
  _id: string;
  orgId: string;
  userId: string;
  name: string;
  email: string;
  location: string;
  loginTime: Date;
  deviceInfo: string;
  ipAddress: string;
}
