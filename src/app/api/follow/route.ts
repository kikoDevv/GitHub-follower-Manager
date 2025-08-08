import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PUT(request: NextRequest) {
  try {
    const { username } = await request.json();

    /*------------------- Get token from headers -------------------*/
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "GitHub token is required" }, { status: 401 });
    }

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const response = await axios.put(
      `https://api.github.com/user/following/${username}`,
      {},
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Length": "0",
        },
      }
    );

    console.log(`Successfully followed ${username}`);
    return NextResponse.json({ success: true, message: `Followed ${username}` });
  } catch (error: any) {
    console.error("Error following user:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to follow user" }, { status: error.response?.status || 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { username } = await request.json();
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "GitHub token is required" }, { status: 401 });
    }

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const response = await axios.delete(`https://api.github.com/user/following/${username}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    console.log(`Successfully unfollowed ${username}`);
    return NextResponse.json({ success: true, message: `Unfollowed ${username}` });
  } catch (error: any) {
    console.error("Error unfollowing user:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to unfollow user" }, { status: error.response?.status || 500 });
  }
}
