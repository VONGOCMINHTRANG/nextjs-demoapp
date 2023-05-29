import { signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../config/firebase";

export default function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, values.email, values.password);

    router.push("/");
    console.log("Login successfully");
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign in</h1>
          <form onSubmit={handleSignIn}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-600 text-white focus:outline-none my-1"
            >
              Sign in
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Create an Account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../sign-up/"
          >
            Sign up
          </a>
          .
        </div>
      </div>
    </div>
  );
}
