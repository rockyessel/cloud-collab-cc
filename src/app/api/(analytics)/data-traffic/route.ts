import { FileProps } from "@/interface";
import { connectToDB } from "@/lib/config/mongoose";
import File from "@/lib/model/file.model";
import Organisation from "@/lib/model/organisation.model";

connectToDB();

interface DataTrafficGetProps {
  _id: { date: string };
  totalDataTransferred: number;
  totalFilesUploaded: number;
  files: { fileId: string }[];
}

const DataTrafficOrg = async (request: Request) => {
  try {
    // Get the organizationId from query parameters
    const { searchParams } = new URL(request.url);
    const orgId = searchParams.get("orgId");

    // Check if the organization exists
    const organization = await Organisation.findById(orgId);

    if (!organization) {
      return Response.json({ error: "Organization not found" });
    }

    // Retrieve all files for the organization
    const files = await File.find({ organizationId: orgId });

    console.log("files: ", files);

    // Aggregate the total data traffic for the organization
    const totalDataTraffic = files.reduce((total, file) => {
      const fileSizeInBytes = file.size; // No need for conversion
      return total + fileSizeInBytes;
    }, 0);

    // Retrieve data traffic by day for the specific organization
    const dataTrafficByDay = await getDataTrafficByDay(orgId!);

    return Response.json({
      organizationId: orgId,
      totalDataTraffic: totalDataTraffic,
      dataTrafficByDay: dataTrafficByDay,
    });
  } catch (error) {
    console.error("Error retrieving data traffic for organization:", error);
    return Response.json({ error: "Internal Server Error" });
  }
};

export { DataTrafficOrg as GET };

const getDataTrafficByDay = async (orgId: string) => {
  try {
    // Query all files for the specific organization and group by creation date
    const dataTraffic: DataTrafficGetProps[] = await File.aggregate([
      {
        $match: {
          organizationId: orgId,
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                date: "$createdAt",
                format: "%Y-%m-%d", // Format as YYYY-MM-DD
                timezone: "UTC", // Adjust timezone if necessary
              },
            },
          },
          totalDataTransferred: { $sum: "$size" },
          totalFilesUploaded: { $sum: 1 },
          files: {
            $push: {
              fileId: "$_id",
              memberId: "$uploadedBy",
            },
          },
        },
      },
      {
        $sort: {
          "_id.date": -1,
        },
      },
    ]);

    console.log("dataTraffic - getDataTraffic: ", dataTraffic[0].files);

    // Format the result according to the specified structure
    const formattedDataTraffic = await Promise.all(
      dataTraffic.map(async (dayData) => {
        const formattedDay = new Date(dayData._id.date).toLocaleDateString(
          "en-US",
          { day: "numeric", month: "short", year: "numeric" }
        );
        const totalAverageDataTransferredThatDay =
          dayData.totalDataTransferred / dayData.totalFilesUploaded;

        const membersThatUploadedFilesOnThatDay = await Promise.all(
          dayData.files.map(async (file) => {
            const foundFile: FileProps | null = await File.findById(file.fileId);

            if (foundFile) {
              return {
                memberId: foundFile.uploadedBy || '',
                fileId: file.fileId,
              };
            }
            return { memberId: "", fileId: "" };
          })
        );

        return {
          day: formattedDay,
          allFilesOfThatDayDataTransferred: `${(
            dayData.totalDataTransferred /
            (1024 * 1024)
          ).toFixed(2)}MB`,
          totalFilesUploadedThatDay: dayData.totalFilesUploaded,
          totalAverageDataTransferredThatDay: `${(
            totalAverageDataTransferredThatDay /
            (1024 * 1024)
          ).toFixed(2)}MB`,
          membersThatUploadedFilesOnThatDay,
        };
      })
    );

    return formattedDataTraffic;
  } catch (error) {
    console.error("Error getting data traffic by day:", error);
    throw error;
  }
};
