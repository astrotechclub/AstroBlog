import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll"
function SmoothScroll() {
    const overscrollOptions = {
        enable: true,
        effect: 'glow',
        damping: 0.2,
        maxOversroll: 150,
        glowColor: "#ffffff"
    };
    const options = {
        damping: 0.7,
        plugins: {
            overscroll: { ...overscrollOptions }
        }
    };
    // useEffect(() => {
    //     Scrollbar.use(OverscrollPlugin);
    //     Scrollbar.init(document.body, options);
    //     return () => {
    //         if (Scrollbar) Scrollbar.destroy(document.body);
    //     }
    // }, []);
    return null;
}

export default SmoothScroll;