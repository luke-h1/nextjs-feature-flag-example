import useFlag from "@frontend/hooks/useFlag";

export default function Home() {
  const loginEnabled = useFlag("login");
  return (
    <div>
      {loginEnabled ? <button>Login</button> : <p>Login feature is disabled</p>}
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
