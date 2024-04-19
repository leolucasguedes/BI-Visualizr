import React, { useState } from 'react';
import { ButtonHTMLAttributes } from 'react';
import { MdClose } from "react-icons/md";
import { UserData } from '@/types';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: UserData[];
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, users }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<UserData[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const results = users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleUserClick = (whatsapp: string) => {
        window.location.href = `https://wa.me/${whatsapp}`;
    };

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose}>
                    <div className="bg-white rounded-lg p-8 shadow-lg relative" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-2 right-2 text-gray-500 cursor-pointer" onClick={onClose}>
                            <MdClose className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Buscar Contato</h2>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                            placeholder="Digite o nome do usuário"
                        />
                        {searchResults.length > 0 ? (
                            <ul className="w-full">
                                {searchResults.map((user) => (
                                    <li
                                        key={user.id}
                                        className="flex items-center border border-gray-200 rounded px-4 py-2 mb-1 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleUserClick(user.whatsapp)}
                                    >
                                        <span className="mr-12">{user.name}</span>
                                        <span className="text-sm text-gray-500">{user.whatsapp}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Nenhum resultado encontrado</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactModal;
