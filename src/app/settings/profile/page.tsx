import Profile from "@/components/forms/profile";
import ProfileReview from "@/components/profile-reviews";
export default async function Page() {
  return (
    <div className="flex justify-center gap-2">
      <div className="min-w-sm">
        <Profile />
      </div>
      <div className="max-w-sm">
        <ProfileReview />
      </div>
    </div>
  );
}
