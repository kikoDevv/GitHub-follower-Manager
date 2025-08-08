"use server";
import axios from "axios";
import { X } from "lucide-react";

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
    if (dataType === "userInfo") {
      const response = await axios.get(endpoint, {
        headers: header,
      });
      console.log(`----${dataType} data:`, response.data);
      return response.data;
    }
    let allData: any[] = [];
    let page = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const response = await axios.get(`${endpoint}?page=${page}&per_page=100`, {
        headers: header,
      });

      const data = response.data;
      allData = allData.concat(data);
      hasMoreData = data.length === 100;
      page++;
      console.log(`----${dataType} page ${page - 1}:`, data.length, "items");
    }

    console.log(`----Total ${dataType}:`, allData.length, "items");
    return allData;
  } catch (error) {
    console.log(`error in get ${dataType}:`, error);
    throw error;
  }
};
