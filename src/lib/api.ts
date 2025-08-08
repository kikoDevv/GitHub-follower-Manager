/*------------------- API functions -------------------*/
export const fetchUserData = async (dataType: string = "userInfo", token: string) => {
  const response = await fetch(`/api/user?type=${dataType}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${dataType}`);
  }

  return response.json();
};

/*------------------- Follow/Unfollow functions -------------------*/
export const followUser = async (username: string, token: string) => {
  const response = await fetch("/api/follow", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to follow user");
  }

  return response.json();
};

export const unfollowUser = async (username: string, token: string) => {
  const response = await fetch("/api/follow", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to unfollow user");
  }

  return response.json();
};
