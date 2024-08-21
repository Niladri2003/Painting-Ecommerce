const { user } = useSelector((state) => state.profile);

console.log("fetch user:", user); // Fetch from your user state or API

export const userProfileImage = user?.profile_picture
  ? user.profile_picture
  : `https://api.dicebear.com/5.x/initials/svg?seed=${
      user?.first_name || "User"
    } ${user?.last_name || ""}`;

// console.log("fetch user:", userProfileImage);
