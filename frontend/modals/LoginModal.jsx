const LoginModal = ({ onClose }) => {
  return (
    <section className="fixed inset-0 flex justify-center items-center z-50">

      <div
        className="absolute inset-0 bg-black/50 z-0"
        onClick={onClose}
      ></div>

      <div className="relative z-10 bg-white w-[400px] justify-center items-center flex flex-col rounded-xl p-6">
        <h1 className="text-2xl">Login your Account</h1>
        <h1 className="mb-6 text-xs">Welcome Students! please sign-up your account.</h1>

        <div className="w-full mb-2">
          <h1 className="text-xs">Username</h1>
          <input type="text" placeholder="Your Username" className="bg-gray-100 h-12 w-full rounded-xl p-2"/>
        </div>

        <div className="w-full">
          <h1 className="text-xs">Password</h1>
          <input type="password" placeholder="Your Username" className="bg-gray-100 h-12 w-full rounded-xl p-2"/>
        </div>

        <button className="bg-black h-12 w-full text-white rounded-xl cursor-pointer mt-6">Sign Up</button>

      </div>
   </section>
  );
};

export default LoginModal;