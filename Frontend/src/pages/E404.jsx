import React from "react";
function E404() {
    return (
        <div className="h-full w-full bg-black bg-gradient-to-b from-page-light-dark to-page-dark flex items-center justify-center">
            <div className="text-center text-white">
                <span className="font-extrabold lg:font-medium text-base lg:text-xl mb-4 block text-dark-pink">Ooops..</span>
                <div className=" leading-big bg-stars text-[100px] lg:text-[270px] font-black bg-clip-text text-transparent-pink">
                    404
                </div>
                <div className="font-bold text-base lg:text-xl mt-16">PAGE NOT FOUND</div>
            </div>
        </div>
    );
}

export default E404;