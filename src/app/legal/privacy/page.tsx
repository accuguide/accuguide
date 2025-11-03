import { CheckCircle } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="py-12">
      <div className="max-w-4xl text-base/7 text-gray-700 dark:text-gray-300">
        <p className="text-sm">Last Updated on May 2, 2025</p>
        <div className=" mt-4">
          <p className="text-gray-600 dark:text-gray-400">
            This privacy notice describes how and why we collect, use, and store
            your information when you use our services available through our
            website.
          </p>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Information We Collect
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            We collect personal information that is provided upon account
            creation, and when you create content on our platform, such as when
            you submit a review or rating.
          </p>

          <h3 className="mt-12 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Personal Information
          </h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            We collect and save the following personal information:
          </p>

          <ul className="mt-8 space-y-8 text-gray-600 dark:text-gray-400">
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400"
              />
              <span>
                <strong className="font-semibold text-gray-900 dark:text-white">
                  Email Address.
                </strong>{' '}
                Used for account creation and login.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400"
              />
              <span>
                <strong className="font-semibold text-gray-900 dark:text-white">
                  Account Name.
                </strong>{' '}
                Used to identify you on our platform
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400"
              />
              <span>
                <strong className="font-semibold text-gray-900 dark:text-white">
                  Profile Image.
                </strong>{' '}
                An image used to personalize your account.
              </span>
            </li>
          </ul>

          <h3 className="mt-12 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Application Data
          </h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            We collect and store information about your interactions with our
            services:
          </p>

          <div className="mt-6 text-gray-600 dark:text-gray-400">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              User Reviews
            </h4>
            <p className="mt-2">
              Information about the reviews you submit, including the content of
              the review, the location it is associated with, and the rating you
              provide.
            </p>
          </div>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            How do we process your information?
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            We use your personal information and application data to provide our
            services and communicate with users regarding their accounts and any
            issues that they may encounter.
          </p>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            When and with whom do we share your personal information?
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            We do not share your personal information with any third parties,
            except as required by law or to protect our rights. Application data
            you create is publicly available across our website and is only
            linked to you via your account name.
          </p>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Do we use cookies?
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            We only use cookies to store required information to keep you logged
            in to your account. We do not use cookies for any other purpose.
          </p>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            How long do we keep your information?
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            We retain your information until you request to delete your account.
            You can request to delete your account at any time by contacting us.
          </p>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            How do we keep your information safe?
          </h2>
          <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              We take the security of your personal information seriously and
              use reasonable measures to protect it from unauthorized access,
              use, or disclosure. However, no method of transmission over the
              internet or method of electronic storage is 100% secure, and we
              cannot guarantee its absolute security.
            </p>
            <p>
              Authentication is done through Google and is subject to their
              privacy policy.
            </p>
            <p>
              We store all our data on Supabase, which is a secure database
              service that uses encryption and other security measures to
              protect your data. Please refer to their privacy policy for more
              information on how they handle your data.
            </p>
          </div>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Do we collect information from minors?
          </h2>
          <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              We do not knowingly solicit data from or market to children under
              18 years of age. By using the Services, you represent that you are
              at least 18 or that you are the parent or guardian of such a minor
              and consent to such minor dependent's use of the Services.
            </p>
            <p>
              If we learn that personal information from users less than 18
              years of age has been collected, we will deactivate the account
              and take reasonable measures to promptly delete such data from our
              records. If you become aware of any data we may have collected
              from children under age 18, please contact us.
            </p>
          </div>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Your rights
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            We will consider and act upon any request in accordance with
            applicable data protection laws.
          </p>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Questions
          </h2>
          <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              If you have any questions about this privacy notice or our
              practices regarding your personal information, please contact us.
            </p>
            <p>
              Please do not use our services if you do not agree with this
              privacy notice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
