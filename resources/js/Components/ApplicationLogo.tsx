import { SVGAttributes } from "react";
import logo from "../../../public/assets/logo.svg";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className="mt-4">
            <img src={logo} alt="Logo" width={133} height={34} />
        </div>
    );
}

