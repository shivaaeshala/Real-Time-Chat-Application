import "../App.css"

function HomePage({ navigate }) {
    return (
      <div className="home-bg flex flex-col items-center justify-center text-white gap-y-10">
        <div>
            <h1 className="text-4xl font-bold mb-4">Small Talk</h1>
            <p className="mb-6 font-bold">A real-time chat application that is built on Socket.io</p>
        </div>
        <div className="buttons flex gap-5">
          <button onClick={() => navigate("/login")} className="bg-blue-500 px-8 py-8 rounded btn-hover">Login</button>
          <button onClick={() => navigate("/register")} className="bg-green-500 px-2 py-2 rounded btn-hover">Create an account</button>
        </div>
      </div>
    );
  }
  

export default HomePage