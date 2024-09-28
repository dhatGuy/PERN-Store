import API from "api/axios.config";
import { useEffect, useState } from "react";

const useAxios = (axiosParams, deps = []) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    try {
      const result = await API.request(params);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, deps);

  return {
    response,
    loading,
    error,
  };
};

export default useAxios;
