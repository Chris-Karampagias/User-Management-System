/* eslint-disable react/prop-types */
import { UserPreviewCard } from "../UserPreviewCard";

export function ResultsPage({ users }) {
  const UserInfoPreviews = users?.map((user) => (
    <UserPreviewCard
      key={user?.id}
      username={user?.username}
      userId={user?.id}
      role={user?.role}
    />
  ));
  return UserInfoPreviews;
}
