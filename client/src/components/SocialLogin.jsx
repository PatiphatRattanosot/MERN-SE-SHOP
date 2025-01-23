import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div className="space-x-3 mt-3 flex justify-center items-center">
      <button onClick={() => googleSignUp()} className="btn rounded-full">
        <FaGoogle className="size-4" />
      </button>
      <button onClick={() => facebookSignUp()} className="btn rounded-full">
        <FaFacebook className="size-4" />
      </button>
      <button onClick={() => githubSignUp()} className="btn rounded-full">
        <FaGithub className="size-4" />
      </button>
    </div>
  );
};

export default SocialLogin;
