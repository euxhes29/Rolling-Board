const handleRequest = async (apiCall) => {
  try {
    const response = await apiCall;
    return [response.data, null];
  } catch (error) {
    return [null, error.data?.message || "Something went wrong"];
  }
};

export default handleRequest;
