import Profile from '@/components/forms/profile'
import ProfileReview from '@/components/reviews/profile-reviews'
export default async function Page() {
  return (
    <div className="justify-center gap-2 md:flex">
      <div className="mb-2 md:mb-0 md:min-w-sm">
        <Profile />
      </div>
      <div className="max-w-sm">
        <ProfileReview />
      </div>
    </div>
  )
}
