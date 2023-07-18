import React from "react";
import banner1 from "../assets/images/banner.jpg";
import banner2 from "../assets/images/banner2.jpg";

class Banners extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [
                banner1,
                banner2
            ]
        }
    }
    render() {
        return (
            <div className="w-full flex flex-col gap-8 mt-16">
                {this.state.banners.map(function (banner) { return <img key={banner + "_banner"} src={banner} className="object-cover h-full w-full" /> })}
            </div>
        );
    }
}

export default Banners;