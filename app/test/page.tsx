'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react';

const Test = () => {
    const { data: session, status, update } = useSession();


    const print = async () => {
        if (!session) {
            console.log("No session");
        } else {
            console.log("Session:", session);
        }
    }

    return (
        <div className='container'>
            <button onClick={print}>Print</button>
        </div>
    )
}

export default Test
