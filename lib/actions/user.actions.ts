'use server';
import { signInFormSchema, signUpFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { hashSync } from 'bcrypt-ts-edge';
import { prisma } from '@/db/prisma';
import { formatError } from '../utils';

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

    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: 'Sign In failed' };
  }
}

// Sign user out
export async function signOutUser() {
  console.log('Signing out user...');

  await signOut({ redirectTo: '/' });
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const plainPassword = user.password;

    user.password = await hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    // sign in the user after successful registration
    console.log('User registered successfully, now signing in...');

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
      redirect: true,
      redirectTo: '/product/calvin-klein-slim-fit-stretch-shirt',
    });

    return { success: true, message: 'User registered successfully' };
  } catch (error:unknown) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error)};
  }
}

// Get user by the ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) throw new Error('User not found');
  return user;
}

