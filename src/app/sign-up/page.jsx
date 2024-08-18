import SignInNew from '@/components/sign-up';
import SignUp from '@/components/ui/SignUp';
import React from 'react';

export const metadata = {
	title: 'Sign Up',
	description: 'Sign Up page',
};

const SignUpPage = () => {
	return (
		<>
			{/* <SignUp /> */}
			<SignInNew />
		</>
	);
};

export default SignUpPage;
