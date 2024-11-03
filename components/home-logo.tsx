import React from 'react';
import Link from'next/link';
import Image from 'next/image';

const Logo = () => {
    return (
        <div className=''>
            <Link href="/">
                <Image src = "/OrgSageLogo.png" alt="Logo" width={48} height={48} className='h-12 cursor-pointer'/>
            </Link>
        </div>
    );
};

export default Logo;