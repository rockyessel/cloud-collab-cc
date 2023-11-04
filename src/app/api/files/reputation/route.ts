import { PANGEA_OBJ } from "@/lib/config/pangea";
import { PangeaConfig, FileIntelService, PangeaErrors } from "pangea-node-sdk";

const FileHashReputation = async (request: Request) => {
  try {
    const hash = await request.text();
    const { domain, token } = PANGEA_OBJ;

    const config = new PangeaConfig({ domain: domain });

    const fileIntel = new FileIntelService(String(token), config);

    const options = { provider: "reversinglabs", verbose: true, raw: true };

    const response = await fileIntel.hashReputation(hash, "sha256", options);

    // console.log(response)
    console.log("Result: ", response.result.data);

    // return response.result.data;

    return Response.json({ data: response.result.data });
  } catch (e) {
    if (e instanceof PangeaErrors.APIError) {
      console.log("Error", e.summary, e.errors);
    } else {
      console.log("Error: ", e);
    }
  }
};

export { FileHashReputation as POST };
