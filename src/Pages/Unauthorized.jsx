import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Result
        status="403"
        title="403 - Unauthorized"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            type="primary"
            className="bg-red-500"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        }
      />
    </div>
  );
};

export default Unauthorized;
