import { CheckCircle } from 'lucide-react'

export default function Disclaimers() {
  return (
    <div className="">
      <div className="max-w-4xl text-base/7">
        <div className="">
          <h2 className="text-3xl">Limitation of Liability</h2>
          <p className="mt-6">
            While Accuguide endeavors to maintain the security and integrity of
            this platform, we expressly disclaim all warranties, whether express
            or implied, including but not limited to warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>

          <p className="mt-6">
            To the fullest extent permitted by applicable law, Accuguide, its
            affiliates, officers, directors, employees, agents, and licensors
            shall not be liable for any direct, indirect, incidental, special,
            consequential, or punitive damages, including but not limited to
            loss of profits, data, use, goodwill, or other intangible losses,
            resulting from:
          </p>

          <ul className="mt-8 space-y-8">
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none"
              />
              <span>Your use of or inability to use the platform</span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none"
              />
              <span>
                Any unauthorized access to or alteration of your transmissions
                or data
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none"
              />
              <span>
                Any conduct or content of any third party on the platform
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircle
                aria-hidden="true"
                className="mt-1 size-5 flex-none"
              />
              <span>
                Any security breaches, system failures, or technical
                malfunctions
              </span>
            </li>
          </ul>

          <p className="mt-6">
            This limitation of liability applies regardless of the legal theory
            upon which the claim is based, whether in contract, tort (including
            negligence), strict liability, or otherwise, even if Accuguide has
            been advised of the possibility of such damages.
          </p>

          <p className="mt-6">
            By using this platform, you acknowledge and agree that you assume
            all risks associated with your use thereof, and you agree to hold
            Accuguide harmless from any claims, damages, or losses arising from
            your use of the platform.
          </p>

          <p className="mt-12 text-sm">Last Updated: February 17, 2026.</p>
        </div>
      </div>
    </div>
  )
}
