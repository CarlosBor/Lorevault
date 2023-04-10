import {FC} from 'react';
import Link from 'next/link';

//React 18 and beyond require for children to be explicitly set in props.
//React 17 and below used to allow for implicit children
type navLinkInfo = {
    url: string,
    children: string
}

const NavButton:FC<navLinkInfo> = ({url, children}) => {
    return(
        <>
            <Link href={url} shallow={true}>{children}</Link>
        </>
    )
};

export default NavButton;