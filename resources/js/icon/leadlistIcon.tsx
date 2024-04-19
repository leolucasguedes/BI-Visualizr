type Props = {
    width?: string | number;
    height?: string | number;
    fill?: string;
    d?: string;
};

export function LeadListIcon({
    width = 42,
    height = 41,
    fill = "#35CD3A",
}: Props) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 37 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_23_9)">
                <path
                    fill={fill}
                    d="M0 17.711V15.3857C0 14.3276 0.55 13.4664 1.65 12.802C2.75 12.1376 4.2 11.8054 6 11.8054C6.325 11.8054 6.6375 11.8116 6.9375 11.8239C7.2375 11.8362 7.525 11.867 7.8 11.9162C7.45 12.4329 7.1875 12.9742 7.0125 13.5402C6.8375 14.1062 6.75 14.6967 6.75 15.3119V17.711H0ZM9 17.711V15.3119C9 14.5245 9.21875 13.8047 9.65625 13.1526C10.0938 12.5006 10.7125 11.9285 11.5125 11.4363C12.3125 10.9442 13.2688 10.5751 14.3813 10.329C15.4938 10.083 16.7 9.95994 18 9.95994C19.325 9.95994 20.5438 10.083 21.6562 10.329C22.7687 10.5751 23.725 10.9442 24.525 11.4363C25.325 11.9285 25.9375 12.5006 26.3625 13.1526C26.7875 13.8047 27 14.5245 27 15.3119V17.711H9ZM29.25 17.711V15.3119C29.25 14.6721 29.1687 14.0692 29.0062 13.5033C28.8438 12.9373 28.6 12.4083 28.275 11.9162C28.55 11.867 28.8313 11.8362 29.1188 11.8239C29.4062 11.8116 29.7 11.8054 30 11.8054C31.8 11.8054 33.25 12.1315 34.35 12.7835C35.45 13.4356 36 14.303 36 15.3857V17.711H29.25ZM12.1875 14.7582H23.85C23.6 14.2661 22.9062 13.8355 21.7687 13.4664C20.6313 13.0973 19.375 12.9127 18 12.9127C16.625 12.9127 15.3688 13.0973 14.2313 13.4664C13.0938 13.8355 12.4125 14.2661 12.1875 14.7582ZM6 10.329C5.175 10.329 4.46875 10.0399 3.88125 9.46166C3.29375 8.8834 3 8.18827 3 7.37625C3 6.53963 3.29375 5.83834 3.88125 5.27239C4.46875 4.70644 5.175 4.42346 6 4.42346C6.85 4.42346 7.5625 4.70644 8.1375 5.27239C8.7125 5.83834 9 6.53963 9 7.37625C9 8.18827 8.7125 8.8834 8.1375 9.46166C7.5625 10.0399 6.85 10.329 6 10.329ZM30 10.329C29.175 10.329 28.4688 10.0399 27.8812 9.46166C27.2937 8.8834 27 8.18827 27 7.37625C27 6.53963 27.2937 5.83834 27.8812 5.27239C28.4688 4.70644 29.175 4.42346 30 4.42346C30.85 4.42346 31.5625 4.70644 32.1375 5.27239C32.7125 5.83834 33 6.53963 33 7.37625C33 8.18827 32.7125 8.8834 32.1375 9.46166C31.5625 10.0399 30.85 10.329 30 10.329ZM18 8.85265C16.75 8.85265 15.6875 8.42203 14.8125 7.5608C13.9375 6.69957 13.5 5.65379 13.5 4.42346C13.5 3.16853 13.9375 2.1166 14.8125 1.26767C15.6875 0.418741 16.75 -0.00572205 18 -0.00572205C19.275 -0.00572205 20.3438 0.418741 21.2062 1.26767C22.0688 2.1166 22.5 3.16853 22.5 4.42346C22.5 5.65379 22.0688 6.69957 21.2062 7.5608C20.3438 8.42203 19.275 8.85265 18 8.85265ZM18 5.89986C18.425 5.89986 18.7812 5.75837 19.0688 5.47539C19.3563 5.19242 19.5 4.84177 19.5 4.42346C19.5 4.00515 19.3563 3.65451 19.0688 3.37153C18.7812 3.08856 18.425 2.94707 18 2.94707C17.575 2.94707 17.2188 3.08856 16.9313 3.37153C16.6438 3.65451 16.5 4.00515 16.5 4.42346C16.5 4.84177 16.6438 5.19242 16.9313 5.47539C17.2188 5.75837 17.575 5.89986 18 5.89986Z"
                />
            </g>
            <defs>
                <clipPath id="clip0_23_9">
                    <rect
                        width="36.41"
                        height="37"
                        fill="white"
                        transform="matrix(1 0 0 -1 0.47998 37.69)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
}