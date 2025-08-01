'use server';
import { signInFormSchema, signUpFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { hashSync } from 'bcrypt-ts-edge';
import { prisma } from '@/db/prisma';
import { formatError } from '@/lib/utils';

// sign the user in with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    const userWithRedirect = {...user, ...{redirect: false, redirectTo: '/'}};
    console.log('got to here 1;');

    await signIn('credentials', {userWithRedirect } );

    console.log('User signed in successfully');
    return { success: true, message: 'Signed in successfully' };

  } catch (error) {
    if (isRedirectError(error)) {
      console.log('Redirect error during sign in:', error);
    }

    console.log('Sign in error:' , error);
    return { success: false, message: 'invalid email or password' };
  }
}

// sign out the user
export async function signOutUser() {
  console.log('Signing out user...');

  await signOut();
}

// sign up a new user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const plainPassword = user.password;

    // hash the password before saving to the database
    user.password = hashSync(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    // sign in the user after successful registration
    console.log('User registered successfully, now signing in...');
    console.log('plain password', plainPassword);
    console.log('user email', user.email);

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
      redirect: false,
      // redirectTo: '/',
    });
    console.log('successful sign in');

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      console.log('redirect error', error);

      throw error;
    }

    console.log('not a redirect error', error);

    return {
      success: false,
      message: formatError(error) || 'An unexpected error occurred',
    };
  }
}
