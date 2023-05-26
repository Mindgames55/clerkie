'use client';
 
import styles from './MenuItem.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

export default function MenuItem({title, href, children}) {
  const segment = useSelectedLayoutSegment() || '/';
  const isActive = href === segment;

    return (
        <li>
            <Link href={href}
                  className={isActive ? styles['item-active'] : styles.item}
            >
                    {children}
                    <span className={styles.text}>{title}</span>
            </Link>
        </li>
    )
}