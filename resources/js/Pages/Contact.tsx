import { Link } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, UserData } from "../types";
import { SlPeople } from "react-icons/sl";
import { LiaCrownSolid } from "react-icons/lia";
import { GrChatOption } from "react-icons/gr";
import { BsPinAngle } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import ContactModal from "../Components/ContactModal";

interface Props extends PageProps {
    usersAll: UserData[];
}

export default function Contact({ auth, usersAll }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<UserData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            event.type === "keydown" &&
            (event as React.KeyboardEvent<HTMLInputElement>).key !== "Enter"
        ) {
            return;
        }

        const searchTerm = (event.target as HTMLInputElement).value;
        setSearchTerm(searchTerm);

        const results = usersAll.filter((user: any) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Contato" />
            <div className="h-auto w-full flex flex-wrap sm:px-5">
                <div className="h-auto w-full mt-10 mb-5 flex gap-3 pl-16 md:pl-3 flex-wrap">
                <ContactModal users={usersAll} isOpen={isModalOpen} onClose={handleCloseModal} />
                    <div className="flex justify-center items-center bg-custom-blue h-[94px] w-[260px] shadow-sm cursor-pointer rounded-md lg:w-[382.5px]" onClick={handleOpenModal}>
                        <div className="p-8 text-18px text-white flex mx-2 font-thin relative font-montserrat">
                            <SlPeople className="size-8 text-white mr-7" />
                            Novo Contato
                        </div>
                    </div>
                    <div className="flex justify-center items-center bg-custom-purple h-[94px] w-[260px] shadow-sm rounded-md lg:w-[382.5px]">
                        <div className="p-8 text-18px text-white flex mx-2 font-thin relative font-montserrat">
                            <GrChatOption className="size-8 text-white mr-7" />
                            Novo Atendimento
                        </div>
                    </div>
                    <div className="flex justify-center items-center bg-custom-cblue h-[94px] w-[260px] shadow-sm rounded-md lg:w-[382.5px]">
                        <div className="p-8 text-18px text-white flex mx-2 font-thin relative font-montserrat">
                            <BsPinAngle className="size-8 text-white mr-7" />
                            Nova Atividade
                        </div>
                    </div>
                    <Link href="/ranking">
                        <div className="flex justify-center items-center bg-custom-green h-[94px] w-[260px] shadow-sm rounded-md lg:w-[382.5px]">
                            <div className="p-8 text-18px text-white flex mx-2 font-thin relative font-montserrat">
                                <LiaCrownSolid className="size-8 text-white mr-6" />
                                Ranking
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="w-full bg-white h-auto pb-10 shadow-sm flex flex-col mt-8 lg:px-8 overflow-x-auto">
                    <div className="p-4 text-custom-gray2 text-14px">
                        Consultar Contato
                    </div>
                    <div className="flex flex-col items-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            onKeyDown={handleSearch}
                            className="w-full h-[50px] my-2 mx-4 rounded-sm border border-gray-200 focus:outline-none focus:ring-2 text-black font-montserrat"
                            placeholder="INFORME O NOME DO CONTATO"
                            style={{
                                paddingLeft: "20px",
                                fontSize: "14px",
                            }}
                        />
                        {searchResults.length > 0 ? (
                            <ul className="w-full">
                                {searchResults.map(
                                    (user: UserData, index: number) => (
                                        <Link href={`/usuario/${user.id}`}>
                                            <li
                                                key={index}
                                                className="w-full flex items-center font-montserrat gap-16 bg-list-gray pl-16 py-2 mb-1 relative"
                                                style={{ maxWidth: "100%" }}
                                            >
                                                <IoPersonSharp className="absolute top-3 left-6" />
                                                <div className="truncate" style={{ width: "100px" }}>{user.name}</div>
                                                <div className="hidden sm:block truncate" style={{ width: "20px" }}>{user.idade}</div>
                                                <div className="hidden md:block truncate" style={{ width: "80px" }}>{user.sexo}</div>
                                                <div className="hidden md:block truncate" style={{ width: "300px" }}>{user.email}</div>
                                                <div className="truncate" style={{ width: "150px" }}>{user.bairro}</div>
                                                <div className="hidden sm:block truncate" style={{ width: "120px" }}>{user.whatsapp}</div>
                                            </li>
                                        </Link>
                                    )
                                )}
                            </ul>
                        ) : (
                            <p className="mt-10">
                                Não há nenhum contato selecionado
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
