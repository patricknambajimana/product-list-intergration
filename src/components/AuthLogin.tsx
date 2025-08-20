const AuthLogin = () => {
  return (
    <div className="w-full ">
      <div className="shadow-md p-4 rounded-2xl text-2xl capitalize">
        <form action="" className="space-y-4">
          <div className="font-extrabold text-green-900">
            <h2>
              <span className="lowercase">e</span>GURA login
            </h2>
          </div>
          <div className="text-left">
            <label htmlFor="username">username</label>
            <input
              type="text"
              placeholder="enter the username"
              className="border focus:outline-none w-full rounded-md p-1"
            />
          </div>
          <div className="text-left">
            <label htmlFor="email">email</label>
            <input
              type="email"
              placeholder="enter yor email"
              className="border focus:outline-none w-full rounded-md p-1"
            />
          </div>
          <div className="w-full text-center border rounded-md bg-green-800 text-white capitalize">
            <button className="capitalize p-2">login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;
