import { connectToDB } from "@/lib/config/mongoose";
import { responseObject } from "@/lib/constants";
import User from "@/lib/model/user.model";
import bcrypt from "bcrypt";

const UserValidateHandler = async (request: Request) => {
  connectToDB();
  try {
    const { email, password } = await request.json();
    if (!email)
      return Response.json({
        ...responseObject,
        msg: "No user email was provided",
      });
    if (!password)
      return Response.json({
        ...responseObject,
        msg: "No user password was provided",
      });

    const foundUser = await User.findOne({ email });

    if (!foundUser)
      return Response.json({
        ...responseObject,
        msg: `User associated with ${email} was not found.`,
      });

    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordMatched)
      return Response.json({
        ...responseObject,
        msg: "Entered password is incorrect.",
      });

    return Response.json({
      msg: "User validation was successfully.",
      success: true,
      data: foundUser,
    });
  } catch (error) {
    console.log(error);
    console.error("User validation failed:", error);
    const err = error as { message: string };
    return Response.json({
      ...responseObject,
      msg: `User validation failed. Error: ${err.message}`,
    });
  }
};

export { UserValidateHandler as POST };
