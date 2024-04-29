import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, UserData } from "../types";
import { Link } from "@inertiajs/react";
import { IoPersonSharp } from "react-icons/io5";
import ExportButton from "../Components/ExportButton";

interface UserProfile extends UserData {
    a1: string;
    user_id: number;
}

interface Props extends PageProps {
    usersAll: UserProfile[];
}

export default function Users({ auth, usersAll }: Props) {

    const userADM = auth.user.is_admin;
    const is_admin = isAdm(userADM);
    const authId = auth.user.id;

    function isAdm(userADM: number): boolean {
        if (userADM === 1) {
            return true;
        } else {
            return false;
        }
    }

    function filterUsers (usersAll: UserProfile[], authId: number) {
        return usersAll.filter(user => user.user_id === authId);
    };

    const usersFiltered = is_admin ? usersAll : filterUsers(usersAll, authId);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <div className="h-auto w-full flex flex-wrap sm:px-5 pb-5">
                <div className="w-full bg-white h-auto pb-10 shadow-sm flex flex-col mt-8 overflow-x-auto">
                    <div className="p-4 text-custom-gray2 text-14px">
                        Usuários - {usersFiltered.length}
                    </div>
                    <ExportButton usersAll={usersFiltered}/>
                    <div className="mt-8 px-10">
                    <div className="w-full flex items-center font-montserrat gap-7 pl-4 py-2 mb-1 bg-list-gray">
                        <div className="truncate font-bold" style={{ width: "190px" }}>Nome</div>
                        <div className="hidden sm:block font-bold" style={{ width: "35px" }}>
                            Idade
                        </div>
                        <div className="hidden md:block font-bold pl-2" style={{ width: "80px" }}>
                            Sexo
                        </div>
                        <div className="hidden md:block font-bold pl-2" style={{ width: "200px" }}>
                            Email
                        </div>
                        <div className="truncate font-bold sm:pl-2" style={{ width: "150px" }}>Bairro</div>
                        <div className="hidden sm:block font-bold pl-2" style={{ width: "120px" }}>
                            Whatsapp
                        </div>
                    </div>
                        <ul>
                            {usersFiltered.map((user, index) => (
                                <li key={index}>
                                    <Link href={`/usuario/${user.id}`}>
                                        <div
                                            key={index}
                                            className="w-full flex items-center bg-list-gray font-montserrat gap-8 pl-4 py-2 mb-1 relative"
                                            style={{ maxWidth: "100%" }}
                                        >
                                            <IoPersonSharp className="absolute top-3 -left-6" />
                                            <div
                                                className="truncate"
                                                style={{ width: "200px" }}
                                            >
                                                {user.name}
                                            </div>
                                            <div
                                                className="hidden sm:block truncate"
                                                style={{ width: "30px" }}
                                            >
                                                {user.idade}
                                            </div>
                                            <div
                                                className="hidden md:block truncate"
                                                style={{ width: "80px" }}
                                            >
                                                {user.sexo}
                                            </div>
                                            <div
                                                className="hidden md:block truncate"
                                                style={{ width: "200px" }}
                                            >
                                                {user.email}
                                            </div>
                                            <div
                                                className="truncate"
                                                style={{ width: "150px" }}
                                            >
                                                {user.bairro}
                                            </div>
                                            <div
                                                className="hidden sm:block truncate"
                                                style={{ width: "120px" }}
                                            >
                                                {user.whatsapp}
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

