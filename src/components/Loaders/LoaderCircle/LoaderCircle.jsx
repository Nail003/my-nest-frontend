import React from "react";
import { ColorRing } from "react-loader-spinner";

const LoaderCircle = (props) => {
    const size = "100%";
    return (
        <div {...props}>
            <ColorRing width={size} height={size} />
        </div>
    );
};

export default LoaderCircle;
