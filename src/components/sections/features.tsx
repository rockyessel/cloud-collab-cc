import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Secure Data Encryption",
      description:
        "Your organization's files are protected with advanced encryption techniques, ensuring that sensitive data remains confidential and secure.",
    },
    {
      title: "Role-Based Access Control",
      description:
        "Admins can set user permissions, controlling who can view, edit, or delete files within the organization, enhancing data security and access management.",
    },
    {
      title: "Two-Factor Authentication (2FA)",
      description:
        "Strengthen your account security with 2FA, adding an extra layer of protection by requiring users to provide two forms of identification for login.",
    },
    {
      title: "Audit Trail and Version History",
      description:
        "Keep track of file changes and user activities with detailed audit logs, and access previous versions of files to ensure data integrity.",
    },
    {
      title: "Secure File Sharing and Collaboration",
      description:
        "Collaborate confidently with secure sharing options, granular access controls, and end-to-end encryption for shared files.",
    },
    {
      title: "Data Backups and Redundancy",
      description:
        "Your data is backed up regularly and stored redundantly to safeguard against data loss, ensuring business continuity in case of unexpected events.",
    },
  ];

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-bold leading-tight">
              Our Secure Organization File Cloud
            </h2>
            <p className="text-xl text-gray-600">
              Discover the powerful features that make our organization-focused
              file cloud a secure and efficient solution for your collaborative
              needs. From robust data security to seamless user management, our
              platform is designed to enhance your {`organization's`}{" "}
              productivity while keeping your data protected
            </p>
          </div>

          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl"
              >
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect
                      className="fill-current text-blue-600"
                      width="64"
                      height="64"
                      rx="32"
                    />
                    <g strokeWidth="2">
                      <path
                        className="stroke-current text-blue-300"
                        d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M20.571 37.714h5.715L36.57 26.286h8"
                      />
                      <path
                        className="stroke-current text-blue-300"
                        strokeLinecap="square"
                        d="M41.143 34.286l3.428 3.428-3.428 3.429"
                      />
                      <path
                        className="stroke-current text-white"
                        strokeLinecap="square"
                        d="M41.143 29.714l3.428-3.428-3.428-3.429"
                      />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
