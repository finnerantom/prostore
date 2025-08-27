'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { CartItem } from '@/types';
import { addItemToCart } from '@/lib/actions/cart.actions';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    console.log('Adding to cart', item);

      const res = await addItemToCart(item);
      
      if (!res.success) {
        
        toast.error(`${res.message}`, {
          style: { backgroundColor: 'red' },
          description: 'Please try again later',
          duration: 4000,
        });
        
        return;
      }
      
    toast(`${item.name} added to cart`, {
      action: {
        label: 'Go to Cart',
        onClick: () => {
          router.push('/cart');
        },
      },
    });
  };
  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      <Plus />
      Add to Cart
    </Button>
  );
};

export default AddToCart;
