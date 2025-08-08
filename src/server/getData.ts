"use server";
import axios from "axios";

const header = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

export const getGithubData = async (dataType: string) => {
  let endpoint = "";

  /*------------------- get data from github using data type -------------------*/
  switch (dataType) {
    case "userInfo":
      endpoint = "https://api.github.com/user";
      break;
    case "followers":
      endpoint = "https://api.github.com/user/followers";
      break;
    case "following":
      endpoint = "https://api.github.com/user/following";
      break;
    default:
      throw new Error(`Invalid dataType: ${dataType}. Valid types are: userInfo, followers, following`);
  }

  try {
    const response = await axios.get(endpoint, {
      headers: header,
    });
    console.log(`----${dataType} data:`, response.data);
    return response.data;
  } catch (error) {
    console.log(`error in get ${dataType}:`, error);
    throw error;
  }
};
