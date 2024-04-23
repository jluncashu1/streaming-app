import { useCallback } from "react";

import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import Head from "next/head";

import useCurrentUser from "@/hooks/useCurrentUser";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Profiles = () => {
    const { data: user } = useCurrentUser();
    const router = useRouter();

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">
                    Who is watching?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => {router.push('/')}}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="
                                w-44
                                h-44
                                rounded-md
                                flex
                                items-center
                                justify-center
                                border-2
                                border-transparent
                                group-hover:cursor-pointer
                                group-hover:border-white
                                overflow-hidden
                            ">
                                <Image src='/images/default-green.png' width={200} height={200} alt="Profile" />
                            </div>
                            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles;
