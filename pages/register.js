import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import Layout from "../layout/layout";
import styles from "../styles/Form.module.css";

export default function Register() {
    const [show, setShow] = useState({password:false, cpassword:false})
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold">Register</h1>
          <p className=" w-3/4 mx-auto text-gray-400 ">
            Lorem ipsum dolor, sit amet consectetur{" "}
          </p>
        </div>
        {/* form */}
        <form className="flex flex-col gap-5">
          <div className={styles.input_group}>
            <input
              type="text"
              name="username"
              className={styles.input_text}
              placeholder="User Name"
              id=""
            />
            <span className="icon flex items-center p-4">
              <HiOutlineUser size={20} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              className={styles.input_text}
              placeholder="Email"
              id=""
            />
            <span className="icon flex items-center p-4">
              <HiAtSymbol size={20} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.password ? "text" : "password"}`}
              className={styles.input_text}
              name="password"
              placeholder="Password"
              id=""
            />
            <span
              className="icon flex items-center p-4"
              onClick={() => setShow({...show, password: !show.password})}
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              className={styles.input_text}
              name="cpassword"
              placeholder="Confirm Password"
              id=""
            />
            <span
              className="icon flex items-center p-4"
              onClick={() => setShow({...show, cpassword: !show.cpassword})}
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
          {/* login buttons */}
          <div className={styles.input_group}>
            <button type="submit" className={styles.button}>
              Register
            </button>
          </div>
          <div className="input-button">
            <button type="button" className={styles.button_custom}>
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
            <button type="button" className={styles.button_custom}>
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
          Have an account{" "}
          <Link href={"/login"}>
            <a className="text-blue-700">Login</a>
          </Link>{" "}
        </p>
      </section>
    </Layout>
  );
}
