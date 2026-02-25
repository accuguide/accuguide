import { CheckCircle } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="">
      <div className="max-w-4xl text-base/7">
        <div className="">
          <h2 className="text-3xl">Information We Collect</h2>
          <p className="mt-6">
            We collect personal information that is provided upon account
            creation, and when you create content on our platform, such as when
            you submit a rating and/or review, and add places to your favorites.
            We may also collect location data to provide location-sensitive
            search results.
          </p>

          <h3 className="mt-12">Personal Information</h3>
          <p className="mt-4">We collect the following personal information:</p>

          <ul className="mt-8 space-y-8">
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none"
              />
              <span>
                <strong className="font-semibold">Email Address.</strong> Used
                for account creation, login, and Accuguide updates. Non
                essential emails from Accuguide can be stopped at any time.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none"
              />
              <span>
                <strong className="font-semibold">Account Name.</strong> Used to
                publicly attribute your contributions to your account. This
                should not be your real name to protect your privacy
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none"
              />
              <span>
                <strong className="font-semibold">Profile Image.</strong> An
                public image used to personalize your account.
              </span>
            </li>
          </ul>

          <h3 className="mt-12">Application Data</h3>
          <p className="mt-4">
            We collect and store information about your interactions with our
            services:
          </p>

          <div className="mt-6">
            <h4>User Reviews</h4>
            <p className="mt-2">
              Information about the reviews you submit, including the content of
              the review and/or the rating you provide.
            </p>
          </div>

          <div className="mt-6">
            <h4>Favorites</h4>
            <p className="mt-2">
              Information about the locations you add to your favorites. This
              data is stored privately and is only visible to you.
            </p>
          </div>

          <div className="mt-6">
            <h4>Location</h4>
            <p className="mt-2">
              We may optionally collect your location data to provide
              location-sensitive search results. This data is not stored and is
              only used during your active session to improve search relevance.
              You can choose to deny location access at any time through your
              browser settings.
            </p>
          </div>

          <h2 className="mt-12 text-3xl">
            How do we process your information?
          </h2>
          <p className="mt-6">
            We use your personal information and application data to provide our
            services and communicate with users regarding their accounts and any
            issues that they may encounter.
          </p>

          <h2 className="mt-12 text-3xl">
            When and with whom do we share your personal information?
          </h2>
          <p className="mt-6">
            If location access is permitted by the user, location data
            (coordinates) will be passed to Google Cloud to provide
            location-sensitive search results. This data is not attributed to
            any other information you may provide to the platform. Location data
            passed to Google Cloud is handled by them in accordance with their
            privacy policy. We do not share any other personal information with
            any third parties, except as required by law or to protect our
            rights. Application data you create is publicly available across our
            website and is only linked to you via your account name (username)
          </p>

          <h2 className="mt-12 text-3xl">Do we use cookies?</h2>
          <p className="mt-6">
            We only use cookies to store required information to keep you logged
            in to your account and save location data (if location access
            permitted) for the duration of the session. We do not use cookies
            for any other purpose.
          </p>

          <h2 className="mt-12 text-3xl">
            How long do we keep your information?
          </h2>
          <p className="mt-6">
            We retain your information until you request to delete your account.
            You can request to delete your account at any time by contacting us.
          </p>

          <h2 className="mt-12 text-3xl">
            How do we keep your information safe?
          </h2>
          <div className="mt-6 space-y-4">
            <p>
              We take the security of your personal information seriously and
              use reasonable measures to protect it from unauthorized access,
              use, or disclosure. However, no method of transmission over the
              internet or method of electronic storage is 100% secure, and we
              cannot guarantee its absolute security.
            </p>
            <p>
              Authentication done through Google and subject to their privacy
              policy and data collection/usage practices.
            </p>
            <p>
              We store all our data on Supabase, which is a secure database
              service that uses encryption and other security measures to
              protect your data. Please refer to their privacy policy for more
              information on how they handle your data.
            </p>
          </div>

          <h2 className="mt-12 text-3xl">
            Do we collect information from minors?
          </h2>
          <div className="mt-6 space-y-4">
            <p>
              We do not knowingly solicit data from or market to children under
              18 years of age. By using the Services, you represent that you are
              at least 18 or that you are the parent or guardian of such a minor
              and consent to such minor dependent's use of the Services assuming
              that you do not use their personal information to use our
              services.
            </p>
            <p>
              If we learn that personal information from users less than 18
              years of age has been collected, we will deactivate the account
              and take reasonable measures to promptly delete such data from our
              records. If you become aware of any data we may have collected
              from children under age 18, please contact us.
            </p>
          </div>

          <h2 className="mt-12 text-3xl">Your rights</h2>
          <p className="mt-6">
            We will consider and act upon any request in accordance with
            applicable data protection laws.
          </p>

          <h2 className="mt-12 text-3xl">Questions</h2>
          <div className="mt-6 space-y-4">
            <p>
              If you have any questions about this privacy notice or our
              practices regarding your personal information, please contact us.
            </p>
            <p>
              Please do not use our services if you do not agree with this
              privacy notice.
            </p>
          </div>

          <p className="mt-12 text-sm">Last Updated: February 17, 2026.</p>
        </div>
      </div>
    </div>
  )
}
