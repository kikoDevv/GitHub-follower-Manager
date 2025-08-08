"use server";
import axios from "axios";

const header = {
  'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

export const getMainUser = async () => {

  try {
    const getName = await axios.get("https://api.github.com/user", {
      headers: header,
    });
    console.log("----main user name: ", getName.data);
    return getName.data;
  } catch (error) {
    console.log("error in get main user name, ", error);
  }
};
