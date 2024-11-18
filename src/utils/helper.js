export const isValidPdfUrl = url => {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.protocol === 'https:' && url.toLowerCase().endsWith('.pdf')
    );
  } catch (error) {
    return false;
  }
};
