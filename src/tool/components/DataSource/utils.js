import { GOOGLE_SPREADSHEET_REGEX } from "../../constants";

export const checkIfUrlIsValid = async (url) => {
  if (!GOOGLE_SPREADSHEET_REGEX.test(url)) {
    return false;
  }

  let status = false;

  try {
    const res = await fetch(url)

    if (res && res.ok) {
      status = true;
    }
  } catch (error) {}

  return status;
}
