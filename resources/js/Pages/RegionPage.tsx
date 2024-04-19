import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { PageProps, UserData } from "../types";
import { IoPersonSharp } from "react-icons/io5";

interface Props extends PageProps {
    usersRegion: UserData[];
}

export default function RegionPage({ auth, usersRegion }: Props) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="RegionPage" />
            <div className="h-auto w-full flex flex-wrap sm:px-5">
                <div className="w-full bg-white h-auto pb-10 shadow-sm flex flex-col mt-8 lg:px-8 overflow-x-auto">
                    <div className="p-4 text-custom-gray2 text-14px">
                        Usuários - {usersRegion[0].bairro}: {usersRegion.length}
                    </div>
                    <div>
                        {usersRegion.length > 0 ? (
                            <ul className="w-full">
                                {usersRegion.map(
                                    (user: UserData, index: number) => (
                                        <Link href={`/usuario/${user.id}`}>
                                            <li
                                                key={index}
                                                className="flex items-center font-montserrat gap-16 bg-list-gray mx-2 pl-16 py-2 mb-1 relative"
                                                style={{ maxWidth: "100%" }}
                                            >
                                                <IoPersonSharp className="absolute top-3 left-6" />
                                                <div className="truncate" style={{ width: "100px" }}>{user.name}</div>
                                                <div className="hidden sm:block truncate" style={{ width: "20px" }}>{user.idade}</div>
                                                <div className="hidden md:block truncate" style={{ width: "80px" }}>{user.sexo}</div>
                                                <div className="hidden md:block truncate" style={{ width: "300px" }}>{user.email}</div>
                                                <div className="truncate" style={{ width: "120px" }}>{user.bairro}</div>
                                                <div className="hidden sm:block truncate" style={{ maxWidth: "120px" }}>{user.whatsapp}</div>
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
