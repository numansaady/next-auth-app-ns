import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import Layout from "../layout/layout";
import login_validate from "../lib/validate";
import styles from "../styles/Form.module.css";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
     validate: login_validate,
    onSubmit,
  });


  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/'
    })
    if(status.ok) router.push(status.url)
  }

  // Google Sign in handler
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  // Github Sign in handler
  async function handleGithubSignIn() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold">Explore</h1>
          <p className=" w-3/4 mx-auto text-gray-400 ">
            Lorem ipsum dolor, sit amet consectetur{" "}
          </p>
        </div>
        {/* form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
            <input
              type="email"
              name="email"
              className={styles.input_text}
              placeholder="Email"
              // onChange={formik.handleChange}
              // value={formik.values.email}
              {...formik.getFieldProps('email')}
            />
            <span className="icon flex items-center p-4">
              <HiAtSymbol size={20} />
            </span>
          </div>
            {/* {formik.errors.email && formik.touched.email ? <p className="text-red-600 text-center">{formik.errors.email}</p> : <></>} */}
         
         
          <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
            <input
              type={`${show ? "text" : "password"}`}
              className={styles.input_text}
              name="password"
              placeholder="Password"
              // onChange={formik.handleChange}
              // value={formik.values.password}
              {...formik.getFieldProps('password')}
            />
            <span
              className="icon flex items-center p-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
            {/* {formik.errors.password && formik.touched.password ? <p className="text-red-600 text-center">{formik.errors.password}</p> : <></>} */}
         
          {/* login buttons */}
          <div className={styles.input_group}>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className={styles.button_custom}
            >
              Sign in with Google{" "}
              <Image
                src={"/assets/google.svg"}
                width={20}
                height={25}
                alt=""
              ></Image>
            </button>
          </div>
          <div className="input-button">
            <button
              onClick={handleGithubSignIn}
              type="button"
              className={styles.button_custom}
            >
              Sign in with Github{" "}
              <Image
                src={"/assets/github.svg"}
                width={20}
                height={25}
                alt=""
              ></Image>
            </button>
          </div>
        </form>
        {/* bottom */}

        <p className="text-center text-gray-400">
          {" "}
          Do not have an account yet?{" "}
          <Link href={"/register"}>
            <a className="text-blue-700">Sign Up</a>
          </Link>{" "}
        </p>
      </section>
    </Layout>
  );
}
