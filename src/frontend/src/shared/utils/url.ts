export const getRedirectUrl = (shortCode: string): string => {
  return `${window.location.origin + '/api/v1/url/redirect'}/${shortCode}`;
};
