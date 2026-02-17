export default function LegalAgreement({ signup }: { signup: boolean }) {
  return (
    <div className="secondary-text mt-0 text-center text-sm">
      By clicking {signup ? 'Sign Up' : 'Sign In'}, you agree to our
      <br />
      <a href="/legal/terms/">Terms of Service</a> and{' '}
      <a href="/legal/privacy/">Privacy Policy</a>.
    </div>
  )
}
