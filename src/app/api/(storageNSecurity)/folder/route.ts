import { connectToDB } from "@/lib/config/mongoose";
import { responseObject } from "@/lib/constants";
import Folder from "@/lib/model/folder.model";

const FolderHandler = async (request: Request) => {
  connectToDB();

  switch (request.method) {
    // Create Folder
    case "POST":
      try {
        const { name, userId } = await request.json();
        console.log("{ name, userId }", { name, userId });
        if (!name) {
          return Response.json({ ...responseObject, msg: "Name is required." });
        }

        if (!userId) {
          return Response.json({
            ...responseObject,
            msg: "User ID is required.",
          });
        }



        const folder = await Folder.create({ name, userId });

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
        const { folderId, name } = await request.json();

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
        const userId = searchParams.get("userId");

        if (!folderId) {
          return Response.json({
            ...responseObject,
            msg: "Folder ID is missing in the request.",
          });
        }

        if (!userId) {
          return Response.json({
            ...responseObject,
            msg: "User ID is missing in the request.",
          });
        }

        // Validate

        const deletedFolder = await Folder.findOneAndDelete({
          _id: folderId,
          userId,
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

    //   Get Folder associated to a user bg ID
    case "GET":
      try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
          return Response.json({
            ...responseObject,
            msg: "Folder ID is missing in the request.",
          });
        }

        const folders = await Folder.find({ userId });

        return Response.json({
          msg: "Folder deleted successfully.",
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
