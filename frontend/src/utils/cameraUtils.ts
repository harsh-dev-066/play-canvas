function isDeviceCheck(deviceName) {
  // Define screen sizes for specific devices (example values)
  const deviceSizes = {
    mobile: { maxWidth: 767 },
    tablet: { minWidth: 768, maxWidth: 1023 },
    laptop: { minWidth: 1024, maxWidth: 1439 },
    desktop: { minWidth: 1440 },
    // Add more devices as needed
  };

  // Get the device size based on the provided name
  const screenSize = deviceSizes[deviceName.toLowerCase()];

  // Check if the device size is defined
  if (screenSize) {
    const { minWidth, maxWidth } = screenSize;

    // Check if the current window width falls within the specified range
    if (
      (minWidth === undefined || window.innerWidth >= minWidth) &&
      (maxWidth === undefined || window.innerWidth <= maxWidth)
    ) {
      return true;
    }
  }

  // Return false if the device size is not found or the window size doesn't match
  return false;
}

async function convertDataUrlToFile(dataUrl, fileName) {
  try {
    // Extract the base64-encoded data from the URL
    const base64Data = dataUrl.split(",")[1];

    // Convert the base64 data to a Blob
    const blob = await fetch(`data:image/png;base64,${base64Data}`).then(
      (response) => response.blob()
    );

    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error("Error converting data URL to file:", error);
    return null;
  }
}

export { isDeviceCheck, convertDataUrlToFile };
