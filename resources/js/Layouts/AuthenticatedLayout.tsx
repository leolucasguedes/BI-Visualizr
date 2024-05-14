import { PropsWithChildren, ReactNode } from "react";
import Nav from "../Components/Nav";
import { User } from "../types";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Nav user={user} />
            {header && (
                <header className="bg-gray">
                    <div className="max-w-7xl sm:pt-7 px-4 md:px-10">
                        {header}
                    </div>
                </header>
            )}
            <main className="lg:ml-60">{children}</main>
        </div>
    );
}
