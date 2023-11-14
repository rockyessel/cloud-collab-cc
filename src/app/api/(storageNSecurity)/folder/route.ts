import { connectToDB } from "@/lib/config/mongoose";
import { responseObject } from "@/lib/constants";
import Folder from "@/lib/model/folder.model";

const FolderHandler = async (request: Request) => {
  connectToDB();

  switch (request.method) {
    // Create Folder
    case "POST":
      try {
        const { name, orgId, description } = await request.json();
        console.log("{ name, orgId }", { name, orgId });
        if (!name) {
          return Response.json({ ...responseObject, msg: "Name is required." });
        }

        if (!orgId) {
          return Response.json({
            ...responseObject,
            msg: "Organisation ID is required.",
          });
        }

        const folder = await Folder.create({
          name,
          organizationId: orgId,
          description,
        });

        console.log("folder: ", folder);

        return Response.json({
          msg: "Folder created successfully.",
          success: true,
          data: folder,
        });
      } catch (error) {
        const err = error as { message: string };
        console.error("Error creating folder:", error);
        return Response.json({
          ...responseObject,
          msg: `Error creating folder. Error: ${err.message}`,
        });
      }

    case "PUT":
      try {
        const { folderId, name, description } = await request.json();

        if (!name) {
          return Response.json({ ...responseObject, msg: "Name is required." });
        }

        if (!folderId) {
          return Response.json({
            ...responseObject,
            msg: "Folder ID is missing in the request.",
          });
        }

        const folder = await Folder.findById(folderId);

        if (!folder) {
          return Response.json({
            ...responseObject,
            msg: "Folder not found.",
          });
        }
        const updatedFolder = await Folder.findOneAndUpdate(
          { _id: folderId },
          { name: name },
          { new: true }
        );
        return Response.json({
          msg: "Folder name updated successfully.",
          success: true,
          data: updatedFolder,
        });
      } catch (error) {
        const err = error as { message: string };
        console.error("Error updating folder name:", error);
        return Response.json({
          ...responseObject,
          msg: `Error updating folder name. Error: ${err.message}`,
        });
      }
      break;

    case "DELETE":
      try {
        const { searchParams } = new URL(request.url);
        const folderId = searchParams.get("folderId");
        const orgId = searchParams.get("orgId");

        if (!folderId) {
          return Response.json({
            ...responseObject,
            msg: "Folder ID is missing in the request.",
          });
        }

        if (!orgId) {
          return Response.json({
            ...responseObject,
            msg: "Organisation ID is missing in the request.",
          });
        }

        // Validate

        const deletedFolder = await Folder.findOneAndDelete({
          _id: folderId,
          orgId,
        });

        if (!deletedFolder) {
          return Response.json({
            ...responseObject,
            msg: "Folder not found or already deleted.",
          });
        }

        return Response.json({
          msg: "Folder deleted successfully.",
          success: true,
          data: deletedFolder,
        });
      } catch (error) {
        const err = error as { message: string };
        console.error("Error deleting folder:", error);
        return Response.json({
          ...responseObject,
          msg: `Error deleting folder. Error: ${err.message}`,
        });
      }

    //   Get Folder associated to a Org bg ID
    case "GET":
      try {
        const { searchParams } = new URL(request.url);
        const orgId = searchParams.get("orgId");

        if (!orgId) {
          return Response.json({
            ...responseObject,
            msg: "Org ID is missing in the request.",
          });
        }

        const folders = await Folder.find({ organisationId: orgId });

        return Response.json({
          msg: "Folder fetched successfully.",
          success: true,
          data: folders,
        });
      } catch (error) {
        const err = error as { message: string };
        console.error("Error deleting folder:", error);
        return Response.json({
          ...responseObject,
          msg: `Error deleting folder. Error: ${err.message}`,
        });
      }

    default:
      return Response.json({
        ...responseObject,
        msg: `Method not allowed`,
      });
  }
};

export {
  FolderHandler as POST,
  FolderHandler as PUT,
  FolderHandler as GET,
  FolderHandler as DELETE,
};
