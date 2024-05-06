import axiosInstance from "./axios";

export const fetchJobsList = async (payload) => {
    try {
      const response = await axiosInstance.post('/adhoc/getSampleJdJSON', payload); // Replace with your API endpoint
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  