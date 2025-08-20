'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className='space--3'>
      <Image
        src={images[current]}
        alt='product image'
        width={1000}
        height={1000}
        className='min-h-[300px]'
        priority={false}
        object-cover='cover'
        object-position='center'
      />
      <div className='flex'>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              'border cursor-pointer hover:border-orange-600',
              current === index && 'border-orange-600'
            )}
          >
            <Image src={image} alt='image' width={100} height={100} priority={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
