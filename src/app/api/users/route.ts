import bcrypt from "bcrypt";
import { UserProps } from "@/interface";
import { connectToDB } from "@/lib/config/mongoose";
import { responseObject } from "@/lib/constants";
import User from "@/lib/model/user.model";

const UserHandler = async (request: Request) => {
  
  connectToDB();
  switch (request.method) {
    // Create
    case "POST":
      try {
        const { name, email, authType, image, username, role, password } =
          await request.json();
        if (!name)
          return Response.json({ ...responseObject, msg: "Name is required." });
        if (!email)
          return Response.json({
            ...responseObject,
            msg: "Email is required.",
          });

        if (!password)
          return Response.json({
            ...responseObject,
            msg: "Password is required.",
          });
        const foundUser = await User.findOne({ email });
        if (foundUser)
          return Response.json({
            ...responseObject,
            msg: "User has already registered. Log in.",
          });
        const newUsername = email.split("@")[0];
        const foundUserWithSameUsername = await User.findOne({ username });
        const userData: UserProps = {
          name,
          email,
          authType,
          username: "",
          image: "",
          id: "",
          password: "",
          role,
          isActive: true,
        };
        if (authType === "provider") {
    
          userData.image = image || ""; // Providers will always provide an image
          userData.password = "";
        } else if (authType === "credential") {
          const hashedPassword = await bcrypt.hash(password, 12);
          userData.image = "/default-profile.png";
          userData.password = hashedPassword;
        }
        const { id, ...removedId } = userData;
        const insertedUser = await User.create(removedId);
        return Response.json({
          msg: "User registered successfully",
          success: true,
          data: insertedUser,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        const err = error as { message: string };
        return Response.json({
          ...responseObject,
          msg: `User creation failed. Error: ${err.message}`,
        });
      }
    // Update
    case "PUT":
      try {
        const { user, userId } = await request.json();
        const { email } = user;

        if (!email) {
          return Response.json({
            ...responseObject,
            msg: "Email is required.",
          });
        }

        const foundUser = await User.findById({ id: userId });

        if (!foundUser) {
          return Response.json({ ...responseObject, msg: "User not found." });
        }

        const updatedArticle = await User.findOneAndUpdate(
          { id: userId },
          { $set: user },
          { new: true }
        );
        if (updatedArticle) {
          return Response.json({
            msg: "User updated successfully",
            success: true,
            data: updatedArticle,
          });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        const err = error as { message: string };
        return Response.json({
          ...responseObject,
          msg: `User update failed. Error: ${err.message}`,
        });
      }
    // Get All User
    case "GET":
      try {
        const users = await User.find({});
        return Response.json({
          msg: "User deleted successfully",
          success: true,
          data: users,
        });
      } catch (error) {
        const err = error as { message: string };
        console.error("Error fetching user by field:", error);
        return Response.json({
          ...responseObject,
          msg: `Error fetching user by field, ${err.message}`,
        });
      }
    // Delete
    case "DELETE":
      try {
        const { userId } = await request.json();

        const deletedUser = await User.findByIdAndDelete(userId);

        if (deletedUser) {
          return Response.json({
            msg: "User deleted successfully",
            success: true,
            data: deletedUser,
          });
        } else {
          return Response.json({ ...responseObject, msg: "User not found." });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        const err = error as { message: string };
        return Response.json({
          ...responseObject,
          msg: `User deletion failed. Error: ${err.message}`,
        });
      }

    default:
      return Response.json({
        ...responseObject,
        msg: `Method not allowed.`,
      });
  }
};

export {
  UserHandler as GET,
  UserHandler as POST,
  UserHandler as DELETE,
  UserHandler as PUT,
};
