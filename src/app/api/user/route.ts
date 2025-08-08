import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dataType = searchParams.get("type") || "userInfo";

  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "GitHub token is required" }, { status: 401 });
  }

  let endpoint = "";
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
      return NextResponse.json(
        { error: `Invalid dataType: ${dataType}. Valid types are: userInfo, followers, following` },
        { status: 400 }
      );
  }

  try {
    if (dataType === "userInfo") {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      console.log(`----${dataType} data:`, response.data);
      return NextResponse.json(response.data);
    }

    let allData: any[] = [];
    let page = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const response = await axios.get(`${endpoint}?page=${page}&per_page=100`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      const data = response.data;
      allData = allData.concat(data);
      hasMoreData = data.length === 100;
      page++;
      console.log(`----${dataType} page ${page - 1}:`, data.length, "items");
    }

    console.log(`----Total ${dataType}:`, allData.length, "items");
    return NextResponse.json(allData);
  } catch (error) {
    console.error(`Error fetching ${dataType}:`, error);
    return NextResponse.json({ error: `Failed to fetch ${dataType}` }, { status: 500 });
  }
}
