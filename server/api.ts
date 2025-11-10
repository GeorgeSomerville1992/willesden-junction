export const sendEvent = async (event: string, data: unknown) => {
  try {
    // whatever this ma be. customerse respone etc..
    const response = await fetch("/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event, data }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending event:", error);
    throw error;
  }
};
