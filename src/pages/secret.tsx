import flagService from "@frontend/services/flagService";
import { GetServerSideProps } from "next";

export default function Secret() {
  return <h1>Secret</h1>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const secret = await flagService.getFlag("secret");

  if (!secret) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: {} };
};
