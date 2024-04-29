import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, UserData } from "../types";
import { Link } from "@inertiajs/react";
import { FaWhatsapp } from "react-icons/fa";

interface UserProfile extends UserData {
    a1: string;
}

interface UserAll extends UserData {
    user_id: number;
    a1: string;
    indicacoes: number;
    rede: number;
}

interface Props extends PageProps {
    userDT: UserProfile;
    usersAll: UserAll[];
    rede: number;
}

export default function UserPage({ auth, userDT, usersAll, rede }: Props) {
    const relatedUsers = usersAll.filter((user) => user.user_id === userDT.id);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="UserPage" />
            <div className="h-auto w-full flex flex-wrap sm:px-5 pb-5">
                <div className="w-full bg-white h-auto pb-10 shadow-sm flex flex-col mt-8 overflow-x-auto">
                    <div className="p-4 text-custom-gray2 text-14px">
                        Detalhes do Usuário
                    </div>
                    <div className="pl-10">
                        <p>
                            <strong>Nome:</strong> {userDT.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {userDT.email}
                        </p>
                        <div className="flex gap-8">
                            <p>
                                <strong>WhatsApp:</strong> {userDT.whatsapp}
                            </p>
                            <a
                                href={`https://wa.me/${userDT.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsapp className="size-5" style={{ cursor: "pointer" }} />
                            </a>
                        </div>
                        <p>
                            <strong>Idade:</strong> {userDT.idade}
                        </p>
                        <p>
                            <strong>Nascimento:</strong> {userDT.nascimento}
                        </p>
                        <p>
                            <strong>Gênero:</strong> {userDT.sexo}
                        </p>
                        <p>
                            <strong>Bairro:</strong> {userDT.bairro}
                        </p>
                        <p>
                            <strong>Cidade:</strong> {userDT.cidade}
                        </p>
                        <p>
                            <strong>Bairro em que vota: </strong>
                            {userDT.zona_eleitoral}
                        </p>
                        <p>
                            <strong>Maior Preocupação: </strong>
                            {userDT.a1}
                        </p>
                        <p>
                            <strong>Rede: </strong>
                            {rede}
                        </p>
                    </div>
                    <div className="mt-8 px-10">
                        <h2 className="text-custom-gray2 text-14px font-semibold mb-4">
                            Indicações
                        </h2>
                        <div className="w-full flex items-center font-montserrat gap-10 pl-4 py-2 mb-1">
                            <div
                                className="truncate font-bold"
                                style={{ width: "100px" }}
                            >
                                Nome
                            </div>
                            <div
                                className="hidden md:block font-bold pl-11"
                                style={{ width: "80px" }}
                            >
                                Sexo
                            </div>
                            <div
                                className="hidden md:block font-bold pl-8"
                                style={{ width: "200px" }}
                            >
                                Email
                            </div>
                            <div
                                className="truncate font-bold pl-6"
                                style={{ width: "150px" }}
                            >
                                Bairro
                            </div>
                            <div
                                className="hidden sm:block font-bold pl-4"
                                style={{ width: "120px" }}
                            >
                                Whatsapp
                            </div>
                            <div
                                className="hidden sm:block font-bold pl-4"
                                style={{ width: "170px" }}
                            >
                                Maior Preocupação
                            </div>
                            <div
                                className="hidden sm:block font-bold pl-4"
                                style={{ width: "70px" }}
                            >
                                Indicações
                            </div>
                            <div
                                className="hidden sm:block font-bold pl-4"
                                style={{ width: "30px" }}
                            >
                                Rede
                            </div>
                        </div>
                        <ul>
                            {relatedUsers.map((user, index) => (
                                <li key={index}>
                                    <Link href={`/usuario/${user.id}`}>
                                        <li
                                            key={index}
                                            className="w-full flex items-center bg-list-gray font-montserrat gap-8 pl-4 py-2 mb-1"
                                            style={{ maxWidth: "100%" }}
                                        >
                                            <div
                                                className="truncate"
                                                style={{ width: "150px" }}
                                            >
                                                {user.name}
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
                                                style={{ width: "130px" }}
                                            >
                                                {user.whatsapp}
                                            </div>
                                            <div
                                                className="hidden sm:block truncate"
                                                style={{ width: "190px" }}
                                            >
                                                {user.a1}
                                            </div>
                                            <div
                                                className="hidden sm:block truncate"
                                                style={{ width: "70px" }}
                                            >
                                                {user.indicacoes}
                                            </div>
                                            <div
                                                className="hidden sm:block truncate"
                                                style={{ width: "30px" }}
                                            >
                                                {user.rede}
                                            </div>
                                        </li>
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
