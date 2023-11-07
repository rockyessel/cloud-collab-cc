import { ResObj } from "@/interface";
import { InitialOrganizationData } from "@/interface";

export const initialOrganizationData: InitialOrganizationData = {
  logo: "",
  name: "",
  description: "",
  owner: "",
  members: [],
  files: [],
};

export const responseObject: ResObj = { msg: "", success: false, data: null };
