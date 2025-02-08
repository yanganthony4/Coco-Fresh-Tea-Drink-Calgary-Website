"use client";

import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

// Dynamically import the Map component
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Locations() {
    return (
        <div>
            <Layout>
            <Map />
            </Layout>
        </div>
    );
}
