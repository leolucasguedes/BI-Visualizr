type Props = {
    width?: string | number;
    height?: string | number;
    fill?: string;
};

export function LeaderIcon({
    width = 42,
    height = 44,
    fill = "#FFFFFF",
}: Props) {
    return (
        <div style={{ width, height }}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <mask
                    id="mask0_30_844"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                >
                    <rect width="36" height="36" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_30_844)">
                    <path
                        fill={fill}
                        d="M2.20535 29.665C1.8266 29.665 1.63722 29.4757 1.63722 29.0969V27.9606C1.63722 26.0668 2.46575 24.6702 4.12282 23.7706L8.1708 21.214C8.64425 20.9773 8.88098 20.5985 8.88098 20.0777V18.3733C7.79205 17.237 7.0582 15.9824 6.67944 14.6094C6.15865 14.1833 5.89825 13.6151 5.89825 12.905V10.8455C5.89825 10.3247 6.08763 9.85123 6.46639 9.42513V6.65545C6.46639 6.51342 6.49006 6.30037 6.53741 6.0163C6.58475 5.73223 6.73862 5.29428 6.99902 4.70248C7.25942 4.11066 7.6145 3.5662 8.06428 3.06908C8.51405 2.57196 9.17688 2.13402 10.0528 1.75526C10.9286 1.3765 11.9584 1.18712 13.142 1.18712C14.3256 1.18712 15.3554 1.3765 16.2313 1.75526C17.1071 2.13402 17.77 2.56012 18.2197 3.03357C18.6695 3.50702 19.0246 4.05148 19.285 4.66697C19.5454 5.28245 19.6993 5.72039 19.7466 5.98079C19.794 6.24118 19.8176 6.4424 19.8176 6.58443V9.42513C20.1964 9.85123 20.3858 10.3247 20.3858 10.8455V12.905C20.3858 13.6151 20.1254 14.1833 19.6046 14.6094C19.2258 15.9824 18.492 17.237 17.403 18.3733V20.0777C17.403 20.5985 17.6398 20.9773 18.1132 21.214L22.1612 23.7706C23.8183 24.6702 24.6468 26.0668 24.6468 27.9606V29.0969C24.6468 29.4757 24.4574 29.665 24.0787 29.665H2.20535ZM2.84451 27.9606V28.4578H23.4395V27.9606C23.4395 26.5403 22.824 25.4987 21.5931 24.8359L17.4741 22.2793C16.6219 21.8058 16.1958 21.072 16.1958 20.0777V18.1602C16.1958 17.9709 16.2431 17.8288 16.3378 17.7341C17.4267 16.7399 18.1369 15.5326 18.4683 14.1123C18.5157 13.9229 18.6103 13.8045 18.7524 13.7572C19.0364 13.5678 19.1785 13.2837 19.1785 12.905V10.8455C19.1785 10.6087 19.0601 10.372 18.8234 10.1353C18.6814 9.99326 18.6103 9.82756 18.6103 9.63818V6.65545C18.6103 6.51342 18.5867 6.33587 18.5393 6.12282C18.492 5.90977 18.3618 5.56652 18.1487 5.09307C17.9357 4.61962 17.6516 4.20536 17.2965 3.85027C16.9414 3.49518 16.397 3.16377 15.6631 2.85603C14.9293 2.54829 14.0889 2.39441 13.142 2.39441C12.1951 2.39441 11.3547 2.54829 10.6209 2.85603C9.88706 3.16377 9.34259 3.49518 8.9875 3.85027C8.63242 4.20536 8.34835 4.61962 8.1353 5.09307C7.92224 5.56652 7.79205 5.90977 7.7447 6.12282C7.69736 6.33587 7.67368 6.51342 7.67368 6.65545V9.63818C7.67368 9.82756 7.60267 9.99326 7.46063 10.1353C7.22391 10.372 7.10555 10.6087 7.10555 10.8455V12.905C7.10555 13.2837 7.24758 13.5678 7.53165 13.7572C7.67368 13.8045 7.76837 13.9229 7.81572 14.1123C8.14713 15.5326 8.85731 16.7399 9.94624 17.7341C10.0409 17.8288 10.0883 17.9709 10.0883 18.1602V20.0777C10.0883 21.072 9.66217 21.8058 8.80996 22.2793L4.76198 24.8359C3.48366 25.4987 2.84451 26.5403 2.84451 27.9606ZM7.7447 32.9318C8.02877 32.9792 8.20631 33.1094 8.27733 33.3224C8.34835 33.5355 8.28917 33.7367 8.09979 33.9261L6.82148 35.2754L7.10555 36.8378C7.10555 37.1219 7.01086 37.3349 6.82148 37.4769C6.72679 37.5243 6.62026 37.548 6.5019 37.548C6.38354 37.548 6.25334 37.5243 6.1113 37.4769L4.69096 36.4827L3.1996 37.4769C2.96287 37.619 2.73798 37.619 2.52493 37.4769C2.31188 37.3349 2.22903 37.1219 2.27637 36.8378L2.48942 35.2754L1.21111 33.9261C1.02173 33.7367 0.962552 33.5355 1.03357 33.3224C1.10459 33.1094 1.28213 32.9792 1.5662 32.9318L3.34163 32.6478L4.12282 31.2274C4.21751 30.9907 4.39505 30.8723 4.65545 30.8723C4.91585 30.8723 5.09339 30.9907 5.18808 31.2274L5.96927 32.6478L7.7447 32.9318ZM5.75622 34.6363L6.39537 33.9261L5.47215 33.784C5.28277 33.7367 5.14073 33.642 5.04605 33.5L4.69096 32.7188L4.26486 33.5C4.17017 33.642 4.02813 33.7367 3.83875 33.784L2.91553 33.9261L3.55468 34.6363C3.69672 34.7783 3.76773 34.944 3.76773 35.1334L3.6257 35.7015L4.33587 35.2044C4.43056 35.157 4.53709 35.1334 4.65545 35.1334C4.77381 35.1334 4.88034 35.157 4.97503 35.2044L5.6852 35.7015L5.54317 35.1334C5.54317 34.944 5.61418 34.7783 5.75622 34.6363ZM16.2668 32.9318C16.5035 32.9792 16.6574 33.1094 16.7284 33.3224C16.7994 33.5355 16.7639 33.7367 16.6219 33.9261L15.2725 35.2754L15.5566 36.8378C15.6039 37.1219 15.5093 37.3349 15.2725 37.4769C15.1778 37.5243 15.0713 37.548 14.953 37.548C14.8346 37.548 14.7281 37.5243 14.6334 37.4769L13.142 36.4827L11.6507 37.4769C11.4139 37.619 11.189 37.619 10.976 37.4769C10.7629 37.3349 10.6801 37.1219 10.7274 36.8378L11.0115 35.2754L9.66217 33.9261C9.52013 33.7367 9.48462 33.5355 9.55564 33.3224C9.62666 33.1094 9.78053 32.9792 10.0173 32.9318L11.7927 32.6478L12.6449 31.2274C12.7396 30.9907 12.9053 30.8723 13.142 30.8723C13.3787 30.8723 13.5444 30.9907 13.6391 31.2274L14.4913 32.6478L16.2668 32.9318ZM14.2073 34.6363L14.9174 33.9261L13.9942 33.784C13.8048 33.7367 13.6628 33.642 13.5681 33.5L13.142 32.7188L12.7159 33.5C12.6212 33.642 12.4792 33.7367 12.2898 33.784L11.3666 33.9261L12.0768 34.6363C12.2188 34.7783 12.2661 34.944 12.2188 35.1334L12.1478 35.7015L12.7869 35.2044C12.8816 35.157 13 35.1334 13.142 35.1334C13.284 35.1334 13.4024 35.157 13.4971 35.2044L14.1363 35.7015L14.0652 35.1334C14.0179 34.944 14.0652 34.7783 14.2073 34.6363ZM24.7178 32.9318C25.0019 32.9792 25.1794 33.1094 25.2505 33.3224C25.3215 33.5355 25.2623 33.7367 25.0729 33.9261L23.7946 35.2754L24.0077 36.8378C24.055 37.1219 23.984 37.3349 23.7946 37.4769C23.6999 37.5243 23.5816 37.548 23.4395 37.548C23.2975 37.548 23.1791 37.5243 23.0844 37.4769L21.5931 36.4827L20.1727 37.4769C19.936 37.619 19.7111 37.619 19.4981 37.4769C19.285 37.3349 19.1785 37.1219 19.1785 36.8378L19.4626 35.2754L18.1842 33.9261C17.9949 33.7367 17.9475 33.5237 18.0422 33.2869C18.0422 33.1922 18.0896 33.1094 18.1842 33.0384C18.2789 32.9674 18.3973 32.9318 18.5393 32.9318L20.3148 32.6478L21.0959 31.2274C21.1906 30.9907 21.3682 30.8723 21.6286 30.8723C21.889 30.8723 22.0665 30.9907 22.1612 31.2274L22.9424 32.6478L24.7178 32.9318ZM22.7293 34.6363L23.3685 33.9261L22.4453 33.784C22.2559 33.7367 22.1139 33.642 22.0192 33.5L21.5931 32.7188L21.238 33.5C21.1433 33.642 21.0013 33.7367 20.8119 33.784L19.8176 33.9261L20.5278 34.6363C20.6698 34.7783 20.7409 34.944 20.7409 35.1334L20.5988 35.7015L21.309 35.2044C21.4037 35.157 21.5102 35.1334 21.6286 35.1334C21.7469 35.1334 21.8535 35.157 21.9482 35.2044L22.6583 35.7015L22.5163 35.1334C22.5163 34.944 22.5873 34.7783 22.7293 34.6363Z"
                    />
                </g>
            </svg>
        </div>
    );
}