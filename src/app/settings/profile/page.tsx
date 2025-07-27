import Profile from "@/components/forms/profile";
import ProfileReview from "@/components/reviews/profile-reviews";
export default async function Page() {
  return (
    <div className="md:flex justify-center gap-2">
      <div className="md:min-w-sm mb-2 md:mb-0">
        <Profile />
      </div>
      <div className="max-w-sm">
        <ProfileReview />
      </div>
    </div>
  );
}
