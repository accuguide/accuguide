const faqs = [
  {
    id: 1,
    question: 'Is my data safe?',
    answer:
      'We take your privacy and security very seriously. We only save the personal data that is necessary for you to maintain an account with us, should you choose to login. Your data stays on our servers and is never sold or given to third parties. See our privacy policy for more information.',
  },
  {
    id: 2,
    question: 'How do I delete my account?',
    answer:
      'For now, please send us an email with the email address associated with your Accuguide account and we can remove all your data from our servers.',
  },
  {
    id: 3,
    question:
      "I'm a developer and I want to contribute to Accuguide. How can I help?",
    answer:
      'Check out our Github repository at github.com/accuguide/accuguide to get started!',
  },
]

export default function FAQPage() {
  return (
    <div>
      <div className="max-w-7xl">
        <dl className="divide-y divide-gray-900/10 dark:divide-white/10">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="py-4 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8"
            >
              <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5 dark:text-white">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
