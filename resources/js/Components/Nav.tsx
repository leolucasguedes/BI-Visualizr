import { Fragment, useState, PropsWithChildren } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "../Components/ApplicationLogo";
import { CgProfile } from "react-icons/cg";
import {
    MdOutlineDashboard,
    MdOutlineContacts,
    MdOutlineTune,
} from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import { PiChatsBold } from "react-icons/pi";
import { User } from "@/types";
import { FaBars, FaBell, FaCircleChevronDown } from "react-icons/fa6";
import { IoSearchOutline, IoClose  } from "react-icons/io5";

const navigation = [
    { name: "Dashboard Geral", href: "/dashboard", icon: MdOutlineDashboard, current: false, },
    { name: "Filtro", href: "/filtro", icon: MdOutlineTune, current: false },
    { name: "Rankings", href: "/ranking", icon: ImStatsBars, current: false },
    { name: "Contatos", href: "/contato", icon: MdOutlineContacts, current: false, },
    { name: "Chat ao Vivo", href: "https://wa.me/21983364694", icon: PiChatsBold, current: false, },
];

const userNavigation = [
    { name: "Perfil", href: "/profile" },
    { name: "Sair", href: "/logout" },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Nav({ user }: PropsWithChildren<{ user: User }>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Fechar Menu
                                                </span>
                                                <IoClose
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component mobile*/}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                        <div className="flex h-16 mt-4 shrink-0 items-center justify-center">
                                            <div className="pb-5 flex items-center justify-center">
                                                <ApplicationLogo />
                                            </div>
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul
                                                role="list"
                                                className="flex flex-1 flex-col gap-y-7"
                                            >
                                                <li>
                                                    <ul
                                                        role="list"
                                                        className="-mx-2 space-y-1"
                                                    >
                                                        {navigation.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.name
                                                                    }
                                                                >
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className={classNames(
                                                                            item.current
                                                                                ? "bg-custom-blue text-white font-montserrat"
                                                                                : "text-custom-gray2 hover:text-white hover:bg-custom-blue font-montserrat",
                                                                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                        )}
                                                                    >
                                                                        <item.icon
                                                                            className={classNames(
                                                                                item.current
                                                                                    ? "text-white"
                                                                                    : "text-custom-gray2 group-hover:text-white",
                                                                                "h-6 w-6 shrink-0"
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </li>
                                                <div className="pt-6 mt-auto ml-16">
                                                    <span className="text-custom-gray2 text-16px font-montserrat mb-5">
                                                        PLATAFORMA F3X BI
                                                    </span>
                                                </div>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* SideBar component desktop*/}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                        <div className="pb-5 flex items-center justify-center">
                            <ApplicationLogo />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul>
                                <hr className="border-t-2 border-gray-200 mb-2" />
                                <Link href="/profile">
                                    <li className="flex items-center py-2 pr-4 hover:bg-custom-blue hover:text-white hover:rounded-md cursor-pointer">
                                        <CgProfile className="size-8 mr-2" />
                                        <p className="text-gray-800 text-14px font-normal">
                                            {user.name}
                                        </p>
                                    </li>
                                </Link>
                                <Link href={`/bairro/${user.bairro}`}>
                                   <p className="text-gray-800 text-12px font-medium font-montserrat ml-[38px] mt-0.5 mb-5">
                                      {user.bairro}
                                   </p>
                                </Link>
                                <hr className="border-t-2 border-gray-200 mb-5" />
                            </ul>
                            <ul
                                role="list"
                                className="flex flex-1 flex-col gap-y-7"
                            >
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-custom-blue text-white font-montserrat"
                                                            : "text-custom-gray2 hover:text-white hover:bg-custom-blue font-montserrat",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current
                                                                ? "text-white"
                                                                : "text-custom-gray2 group-hover:text-white",
                                                            "h-6 w-6 shrink-0"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                            <div className="pt-6 mt-auto">
                                <span className="text-custom-gray2 text-16px font-montserrat ml-[20px] mb-5">
                                    PLATAFORMA F3X BI
                                </span>
                            </div>
                        </nav>
                    </div>
                </div>
                {/* Nav component*/}
                <div className="lg:pl-60">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-black px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <FaBars className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div
                            className="h-6 w-px bg-gray-900/10 lg:hidden"
                            aria-hidden="true"
                        />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form
                                className="relative flex flex-1"
                                action="#"
                                method="GET"
                            >
                                <label
                                    htmlFor="search-field"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <input
                                    id="search-field"
                                    className="block h-[37px] w-full 2x1:w-[972px] bg-custom-gray my-2 mt-3 rounded-3xl focus:outline-none text-white font-montserrat border-0 py-0 pl-6 pr-0 placeholder:text-gray-400 placeholder:text-14px focus:ring-0 sm:text-sm"
                                    placeholder="Procurar..."
                                    type="search"
                                    name="search"
                                />
                                <IoSearchOutline
                                    className="pointer-events-none absolute inset-y-0 right-5 2x1:right-[375px] h-full w-5 text-white"
                                    aria-hidden="true"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-6">
                                {/* Separator */}
                                <div
                                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                                    aria-hidden="true"
                                />
                                {/* Profile menu */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Menu</span>
                                        <CgProfile className="size-6 text-white" />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span
                                                className="ml-4 text-sm font-semibold leading-6 text-white"
                                                aria-hidden="true"
                                            >
                                                Olá, {user.name}
                                            </span>
                                            <FaCircleChevronDown
                                                className="ml-2 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-50"
                                                                    : "",
                                                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                <button
                                    type="button"
                                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">
                                        Notificações
                                    </span>
                                    <FaBell
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
