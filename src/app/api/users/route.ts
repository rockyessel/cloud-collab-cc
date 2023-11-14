import { connectToDB } from "@/lib/config/mongoose";
import User from "@/lib/model/user.model";

const UserHandler = async (request: Request) => {
  connectToDB();
  try {
    switch (request.method) {
      case "GET":

        try {
          const users = await User.find({});
          return Response.json({ success: true, data: users });
        } catch (error) {
          return Response.json({ success: false, error });
        }

      case "POST":
        try {
          const { user } = await request.json();
          if (!user)
            return Response.json({
              success: false,
              data: {},
              msg: "Data is undefined.",
            });

          const created = await User.create({ ...user });

          if (created) {
            console.log("User created successfully:", created);
            return Response.json({ success: true, data: created });
          } else {
            return Response.json({
              success: false,
              data: {},
              msg: "Error creating user.",
            });
          }
        } catch (error) {
          console.log(error);
          return Response.json({ success: false, data: {}, msg: error });
        }

      default:
        return Response.json({ success: false, error: "Method not allowed." });
    }
  } catch (error) {
    return Response.json({ success: false, error: "Internal server error" });
  }
};

export { UserHandler as GET, UserHandler as POST };


const createUserIfNotExists = async (userData) => {
  const { pangeaId } = userData;

  try {
    // Check if user with the given pangeaId already exists
    const existingUser = await User.findOne({ pangeaId });

    if (existingUser) {
      console.log(`User with pangeaId ${pangeaId} already exists.`);
      return existingUser; // User already exists, return the existing user
    }

    // User doesn't exist, create a new user
    const createdUser = await User.create(userData);
    console.log(`User with pangeaId ${pangeaId} created successfully.`);
    return createdUser;
  } catch (error) {
    console.error(`Error checking/creating user: ${error}`);
    throw error; // Handle the error as needed in your application
  }
};
