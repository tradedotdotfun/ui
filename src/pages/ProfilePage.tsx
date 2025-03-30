import { useParams } from "react-router-dom";

import UserProfile from "../components/UserProfile";

import PageLayout from "./PageLayout";

export default function ProfilePage() {
  const { address } = useParams<{ address: string }>();

  if (!address) {
    window.location.href = "/";
    return null;
  }

  return (
    <PageLayout>
      <UserProfile address={address} />
    </PageLayout>
  );
}
