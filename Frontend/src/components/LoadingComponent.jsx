function LoadingComponent({ dark }) {
    return (
        <div className={`w-full flex justify-center items-center h-16 ${dark ? null : "invert"}`}>
            <div className="pswp__preloader__icn">
                <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingComponent;