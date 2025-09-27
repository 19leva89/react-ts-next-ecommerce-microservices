import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
	return (
		<div className='mt-16 flex items-center justify-center'>
			<SignIn />
		</div>
	)
}

export default SignInPage
