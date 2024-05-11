import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { API_HOST } from "../../constants";
import { FaDownload } from "react-icons/fa";

const ExcelDownloader: React.FC = () => {
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const response: AxiosResponse<Blob> = await axios.get(
        `${API_HOST}/export-to-excel`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "motion_data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }

    setDownloading(false);
  };

  return (
    <Button
      fontSize="sm"
      colorScheme="orange"
      my={6}
      p={6}
      leftIcon={<FaDownload />}
      onClick={handleDownload}
      isLoading={downloading}
    >
      {downloading ? "Downloading..." : "Download Excel"}
    </Button>
  );
};

export default ExcelDownloader;
