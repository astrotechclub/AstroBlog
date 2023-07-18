import React from "react";


class AnimatedBg extends React.Component {
    render() {
        return (
            <div className="absolute top-0 left-0 w-full h-96">
                <div className="h-full w-full -z-10 bg-stars  mix-blend-lighten bg-center"></div>
                <div className="h-full w-full bg-gradient-to-b from-light-pink to-transparent position absolute top-0 left-0 opacity-25"></div>
            </div>
        );
    }
}

export default AnimatedBg;