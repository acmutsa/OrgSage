import React from 'react';
import Link from'next/link';
import Image from 'next/image';

const Logo = () => {
    return (
        <Link href="/">
            <Image src = "/OrgSageLogo.svg" alt="Logo" width={50} height={50} className='cursor-pointer'/>
        </Link>
    );
};

export default Logo;