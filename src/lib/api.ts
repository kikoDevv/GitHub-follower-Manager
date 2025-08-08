/*------------------- API functions -------------------*/
export const fetchUserData = async (dataType: string = "userInfo") => {
  const response = await fetch(`/api/user?type=${dataType}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${dataType}`);
  }

  return response.json();
};

/*------------------- Follow/Unfollow functions -------------------*/
export const followUser = async (username: string) => {
  const response = await fetch("/api/follow", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to follow user");
  }

  return response.json();
};

export const unfollowUser = async (username: string) => {
  const response = await fetch("/api/follow", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to unfollow user");
  }

  return response.json();
};
