'use client';
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return <div className="flex flex-col items-center justify-center min-h-screen ">
        <Image
            src="/images/logo.svg"
            alt={`${APP_NAME} logo`}
            width="0"
            height="0"
            priority={true}
            sizes="100vw"
            style={{ width: 48, height: 'auto' }}
        />
        <>
            <h1 className="text-3xl font-bold mt-4 mb-4" >Page Not Found</h1>
            <p className="text-destructive ">Sorry, could not find the page you requested.</p>
            <Button
                variant="outline"
                className="mt-4 ml-2"
                onClick={() => window.location.href = '/'}
            >
                Go to Home
            </Button>
        </>
    </div>

}

export default NotFoundPage;