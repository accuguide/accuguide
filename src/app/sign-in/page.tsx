import SigninForm from '@/components/forms/signin-form'
import { Toaster } from '@/components/ui/sonner'

export default function Page() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <SigninForm />
    </>
  )
}
