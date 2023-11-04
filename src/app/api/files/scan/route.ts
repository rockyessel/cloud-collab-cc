import { PANGEA_OBJ } from "@/lib/config/pangea";
import {
  PangeaConfig,
  FileScanService,
  PangeaErrors,
} from "pangea-node-sdk";

const FileScanHandler = async (request: Request) => {
  const { domain, token } = PANGEA_OBJ;
  const config = new PangeaConfig({
    domain: domain,
    queuedRetryEnabled: true,
    pollResultTimeoutMs: 60 * 1000,
  });
  const client = new FileScanService(String(token), config);

  const file = await request.formData();
  const userFile = file.get("upload") as unknown as File;
  const buffer = (await userFile.arrayBuffer()) as unknown as object;

  console.log(file);
  console.log(buffer);
  //   console.log(userFile.webkitRelativePath);
  // const s = new PangeaRequest()
  try {
    const request = { verbose: true, raw: true, provider: "reversinglabs" };
    const response = await client.fileScan(request, "");
    console.log("Result:", response.result);
  } catch (e) {
    if (e instanceof PangeaErrors.APIError) {
      console.log(e.toString());
    } else {
      console.log("Error: ", e);
    }
  }
};

export { FileScanHandler as POST };
