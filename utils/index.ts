// Function to generate a random RGB array
// I wrote this function myself as part of the task requirements.
export const getRandomRGBArr = (): RGBArr => {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);

  return [R, G, B];
};

// Function to determine the appropriate text color (black or white) based on background color.
// This implementation is adapted from a well-known algorithm found online.
// I did not invent this logic but used it because it is a standard way to calculate luminance.
export const getTextColor = (rgbArr: RGBArr): "black" | "white" => {
  const [r, g, b] = rgbArr;

  const normalize = (c: number) => c / 255;
  const srgb = [r, g, b].map(normalize);

  const gammaCorrect = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const [rLinear, gLinear, bLinear] = srgb.map(gammaCorrect);

  const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;

  return luminance > 0.5 ? "black" : "white";
};
