import { Link } from "@inertiajs/react";
import { WorldIcon } from "../icon";
import { Count } from "../types";
import { IoSearchOutline } from "react-icons/io5";

interface Props {
    bairros: Count[];
    maxItems: number;
}

function AreaComponent({ bairros, maxItems }: Props): JSX.Element {
    const sortedBairros = bairros.sort((a, b) => b.count - a.count);
    const limit = sortedBairros.slice(0, maxItems);

    return (
        <div className="w-full text-left mt-8 bg-white pb-10 rounded-xl relative">
            <div className="flex justify-center absolute top-6 left-8">
                <WorldIcon />
            </div>
            <h1 className="text-18px mx-20 font-normal mb-4 py-6 sm:text-22px font-montserrat">
                Bairros mais cadastrados
            </h1>
            <div className="flex justify-between px-6 ml-8 mb-2 sm:mr-10 md:mr-40">
                <p className="py-2 ml-1 font-bold font-montserrat">Bairros</p>
                <p className="py-2 font-bold font-montserrat">Cadastros</p>
            </div>
            <div className="overflow-x-auto h-auto sm:mx-7">
                <ul className="mb-4 px-2 sm:px-4">
                    {limit.map((item: Count, index: number) => (
                        <div
                            className={`flex justify-between ${
                                index % 2 === 0 ? "bg-list-gray" : "bg-white"
                            }`}
                        >
                            <li key={index} className="py-2 pl-4">
                                {item.name}
                            </li>
                            <div className="flex">
                                <li key={index} className="py-2 mr-7 md:mr-32">
                                    {item.count}
                                </li>
                                <Link href={`/bairro/${item.name}`}>
                                    <IoSearchOutline className="size-4 mt-3 mr-6 text-custom-green" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AreaComponent;
