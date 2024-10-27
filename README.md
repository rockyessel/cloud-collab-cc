# Cloud Collaboration (CC) - (Cloud-Collab-CC)

This personal application is built using Pangea Cloud, a platform that provides robust security features for developers to integrate into their projects. The goal of this project is to create an organizational File Management System tailored for companies, ensuring top-tier security through various Pangea features.

## Features Used

### 1. Secure Audit Log
- **Compliance**: Meet your compliance requirements by recording activity to a tamper-proof audit log.
- **Scalability**: Designed to scale with even the most demanding retention and recall requirements.

### 2. Redact
- **Data Protection**: Stop leaking PII, financial, healthcare, and other sensitive data.
- **Custom Rules**: Use the Redact service with custom rules to identify and remove sensitive data.

### 3. Secure Share
- **File Transfer**: Securely transfer files between authorized users.
- **Malware Protection**: Protection from malware and removal of dangerous or improper content.
- **Browser-Based Access**: Access a file explorer view when uploading or downloading files.

### 4. Sanitize
- **Cleansing Documents**: Remove malicious URLs and harmful embedded content.
- **Confidentiality**: Integrate with the Redact service for an extra layer of confidentiality.

### 5. File Scan
- **Malware Detection**: Scan uploads, attachments, and other file objects for malware via a simple API.

### 6. Embargo
- **Compliance Checks**: Verify the origins of requests and ensure compliance with embargoes, sanctions, and internal rules.

### 7. Vault
- **Secure Development Lifecycle**: Prevent private key material from leaking into code and protect secrets.

### 8. AuthN (Authentication)
- **End-to-End Flows**: Implement MFA, strong passwords, and session token rotation for securing access.

### 9. File Intel
- **Reputation Check**: Verify files from unknown sources to ensure they aren’t associated with malicious activity.

### 10. IP Intel
- **Client Activity Insights**: Look up client IPs to understand their origin and associated activity.

### 11. User Intel
- **Breach Data Checking**: Verify if a user’s PII or credentials have been compromised by checking against a large repository of breach data.

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rockyessel/cloud-collab-cc.git
   cd cloud-collab-cc
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   Rename `.env.example` to `.env` and add your configuration variables.

4. **Run the application:**

   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or features.
