import { getSession } from "next-auth/react";
import Link from "next/link";

const profile = () => {
  return (
    <div>
      <section className="container mx-auto text-center">
        <h3 className="text-4xl font-bold">Profile Page</h3>
      </section>

      <Link href={"/"} className="">
        <a className="flex justify-center mt-10 text-6xl">Home Page</a>
      </Link>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // authorized user return to homepage
  return {
    props: { session },
  };
}

export default profile;
