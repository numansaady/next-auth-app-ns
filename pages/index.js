import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {  
  const {data: session} = useSession()

  function handleSignOut(){
    signOut()
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Auth App</title>
      </Head>

      {session? User({session, handleSignOut}) : <Guest/>}
    </div>
  );
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold">Welcome! Guest User</h1>
      <h3 className="mt-6 text-2xl font-bold">Homepage for Guest</h3>

      <div className="flex justify-center">
        <Link href={'/login'}><a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500">Sign in</a></Link>
      </div>
    </main>
  );
}
// Authorized User
function User({session, handleSignOut}){
  return (
    <main className="container mx-auto text-center py-20">
    <h1 className="text-4xl font-bold">Welcome! Authorized User</h1>
    <h3 className="mt-6 text-2xl font-bold">Homepage for User</h3>

    <div className="details">
      <h5>{session.user.name}</h5>
      <h5>{session.user.email}</h5>
    </div>

    <div className="flex justify-center">
      <button onClick={handleSignOut} className="mt-6 ">Sign Out</button>
    </div>

    <div className="flex justify-center">
      <Link href={'/profile'}><a className="mt-5 px-10 py-1 bg-indigo-500">Profile Page</a></Link>
    </div>
  </main>
  )
}

// Protected Route
export async function getServerSideProps({req}){
  const session = await getSession({req})

  if(!session){
    return{
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {session}
  }
}
