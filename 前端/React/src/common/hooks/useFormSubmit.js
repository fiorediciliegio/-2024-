import { useState } from "react";
import axios from "axios";

const useFormSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data, url, onSuccess) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(url, data);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err);
      console.error("Error saving data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
};

export default useFormSubmit;
