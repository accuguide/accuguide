import { CheckCircle } from 'lucide-react'

export default function Disclaimers() {
  return (
    <div className="py-12">
      <div className="max-w-4xl text-base/7 text-gray-700 dark:text-gray-300">
        <p className="text-sm">Last Updated on July 18, 2025</p>
        <div className=" mt-4">
          <p className="text-gray-600 dark:text-gray-400">
            This disclaimer outlines the limitations and responsibilities of
            Accuguide.
          </p>

          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
            Limitation of Liability
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            While Accuguide endeavors to maintain the security and integrity of
            this platform, we expressly disclaim all warranties, whether express
            or implied, including but not limited to warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>

          <p className="mt-8 text-gray-600 dark:text-gray-400">
            To the fullest extent permitted by applicable law, Accuguide, its
            affiliates, officers, directors, employees, agents, and licensors
            shall not be liable for any direct, indirect, incidental, special,
            consequential, or punitive damages, including but not limited to
            loss of profits, data, use, goodwill, or other intangible losses,
            resulting from:
          </p>

          <ul className="mt-8 space-y-6 text-gray-600 dark:text-gray-400">
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400"
              />
              <span>Your use of or inability to use the platform</span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400"
              />
              <span>
                Any unauthorized access to or alteration of your transmissions
                or data
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400"
              />
              <span>
                Any conduct or content of any third party on the platform
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400"
              />
              <span>
                Any security breaches, system failures, or technical
                malfunctions
              </span>
            </li>
          </ul>

          <p className="mt-8 text-gray-600 dark:text-gray-400">
            This limitation of liability applies regardless of the legal theory
            upon which the claim is based, whether in contract, tort (including
            negligence), strict liability, or otherwise, even if Accuguide has
            been advised of the possibility of such damages.
          </p>

          <p className="mt-8 text-gray-600 dark:text-gray-400">
            By using this platform, you acknowledge and agree that you assume
            all risks associated with your use thereof, and you agree to hold
            Accuguide harmless from any claims, damages, or losses arising from
            your use of the platform.
          </p>
        </div>
      </div>
    </div>
  )
}
