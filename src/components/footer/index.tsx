import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-black text-white h-auto p-8 md:h-full lg:h-[50vh] lg:flex lg:flex-col lg:justify-between lg:px-16">
      <div className="flex flex-col lg:flex-row lg:gap-20">
        <div className="lg:w-1/2">
          <div className="text-3xl my-6">NewsPaper</div>
          <p className="text-gray-300 font-thin">
            Daily newspaper magazine with interesting scientific articles and
            guides on modern technology and fashion.
          </p>
          <Link href="/" className="text-yellow-500 my-4 inline-block">
            Read More
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:gap-10 md:my-12 lg:w-full lg:my-0">
          <div className="my-6 w-full">
            <div className="text-2xl">Company</div>
            <hr className="bg-white my-4" />
            <div className="flex flex-col text-gray-300 gap-2">
              <Link href="/">Home page</Link>
              <Link href="/">About us</Link>
              <Link href="/">Blogs</Link>
            </div>
          </div>

          <div className="my-6 w-full">
            <div className="text-2xl">Categories</div>
            <hr className="bg-white my-4" />
            <div className="flex flex-col text-gray-300 gap-2">
              <Link href="/">Privacy police</Link>
              <Link href="/">Terms and conditions</Link>
              <Link href="/">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-center">
        Copyright © 2021 Newspaper Magazine. All right reserved.
      </div>
    </div>
  );
};
