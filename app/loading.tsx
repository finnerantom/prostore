import Image from 'next/image';
import loader from '@/assets/loader.gif';

const LoadingPage = () => {
    return <div style={{
        height: '150',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '150',

    }}>
        <Image
            src={loader}
            alt="Loading..."
            className="mx-auto mt-20"
            unoptimized={true}
            width="0"
            height="0"
            priority={false}
            sizes="100vw"
            style={{ width: 150, height: 'auto' }}
        />
    </div>
}

export default LoadingPage;