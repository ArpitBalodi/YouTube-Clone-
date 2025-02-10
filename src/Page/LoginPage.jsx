function LoginPage(){
    return(
        <div className="flex items-center justify-center w-full h-[100vh] bg-[rgba(240,244,249,1)]">
            <div className="w-[70%] flex h-[60%] bg-white p-9 rounded-4xl">
                <div className="flex flex-col gap-5 w-1/2">
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="google" className="h-14"/>
                    </div>
                    <h2 className=" text-4xl">Sign in</h2>
                    <p>to continue to YouTube</p>
                </div>

                <div className="w-1/2 mt-10">
                    <form className="flex flex-col gap-[50px] mb-6">
                        <input 
                        type="text" 
                        placeholder="Email or Phone"
                        className="border-1 w-[30vw] p-[1rem] focus:border-gray-400 focus:outline-none rounded-lg"
                        />

                        <input 
                        type="password" 
                        placeholder="Password"
                        className="border-1 w-[30vw] p-[1rem] focus:border-gray-400 focus:outline-none rounded-lg"
                        />

                    </form>
                    <p className="mb-6">
                    Not your computer? Use Guest mode to sign in privately. 
                        <a href="https://support.google.com/chrome/answer/6130773?hl=en"  className=" text-blue-800">
                        &nbsp;Learn more about using Guest mode
                        </a>
                    </p>

                    <div className="w-[50%] float-end gap-6 flex flex-row-reverse mr-8">
                    
                        <button className=" bg-blue-700 text-white p-2 w-[80px] rounded-3xl cursor-pointer">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;