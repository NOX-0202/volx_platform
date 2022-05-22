import DashNav from '@/root/public/components/DashNav';
import localforage from 'localforage';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Pageloading';

// import { Container } from './styles';

function me() {
    const router = useRouter();
    const [loading, toggleLoading] = useState(true);
    const [user, setUser] = useState({});


    useEffect(() => {
        console.log('me');
        localforage.getItem('user').then(user => {
            toggleLoading(true);
            if (user) {
                setUser(user[0]);
            } else {
                router.push('/');
            }
            toggleLoading(false);
        });
    }, []);

    const blaze_menu = [];
    blaze_menu.push({ name: 'Padrões', icon: "/assets/patterns.png", link: '/me/bots/blaze/double/patterns' });
    blaze_menu.push({ name: 'Bot Double', icon: "/assets/blaze_icons/double.svg", link: '/me/bots/blaze/double' });
    blaze_menu.push({ name: 'Bot Crash', icon: "/assets/blaze_icons/crash.svg", link: '/me/bots/blaze/double' });

    return loading ? <div className='bg-volx h-100'><Spinner className="text-primary" /></div> : <main>
        <DashNav title={`eae, ${user.name}`} />
        <div className="bg-volx h-100 ">


            <div className="container d-flex flex-column my-4">
                <h3 className='text-white'>Pacote Blaze: </h3>
                <div className=" d-flex flex-row gap-3">
                    {
                        blaze_menu.map(item => {
                            return <div className="d-flex flex-column justify-content-center align-items-center gap-2 rounded" style={{ backgroundColor: "rgb(32, 32, 36)", height: 150, width: 250 }} key={item.name}>
                                <div>
                                    <img src={item.icon} height="60" />
                                </div>
                                <a href={item.link} className="text-volx">{item.name}</a>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </main>;
}

export default me;