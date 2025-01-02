function Footer() {
    return (
        <div className=" w-full h-fit flex flex-col md:flex-row items-center text-start justify-between gap-3 sm:gap-2  md:gap-4 lg:gap-14 mt-8  postiiton-absolute bottom-0 bg-gray-200 px-4 py-4 md:p-6 lg:p-9">
            <div className="flex-1 w-full text-sm">
                <h2 className="font-bold">About</h2>
                <p className=" text-[#696A75] text-justify md:text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam</p>
                <div className=" w-full mt-4 ">
                    <span className="inline-block font-bold">Email:</span><span className="text-end text-[#696A75] ml-4">sample@gmail.com</span>
                </div>
                <div className="w-full">
                    <span className=" font-bold">Phone :</span>
                    <span className="text-right text-[#6b6c76] ml-3 ">880 123 456 789</span>
                </div>

            </div>
            <div className="flex-1 flex gap-20 sm:gap-10 text-sm  w-full  py-4">
                <div className="">
                    <h1 className="font-bold">Quick Links</h1>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Blog</li>
                        <li>Archived</li>
                        <li>Author</li>
                        <li>Contact</li>
                    </ul>

                </div>
                <div className="">
                    <h1 className="font-bold">Category</h1>
                    <ul>
                        <li>Lifestyle</li>
                        <li>Technology</li>
                        <li>Business</li>
                        <li>Travel</li>
                        <li>Economy</li>
                        <li>Sports</li>
                    </ul>
                </div>
            </div>
            <div className="flex-1 p-2  ">
                <div className="text-center  bg-[#E8E8EA] p-3 rounded-md flex flex-col gap-4">

                    <div>
                        <h1 className="font-bold ">Weekly Newsletter</h1>
                        <span className="text-[#6b6c76] md:text-sm">Get blog articles and offers via email</span>


                    </div>
                    <div>

                        <input className="w-full h-full rounded-lg border-2 p-3 border-[#DCDDDF]" type="text" placeholder="email" />
                        <button className="w-full rounded-lg  p-3 mt-2 md:text-sm text-white bg-[#4B6BFB]" type="submit">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer