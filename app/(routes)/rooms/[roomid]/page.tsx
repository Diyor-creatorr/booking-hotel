import { getRoomDetail } from '@/action/getRooms';
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { apiImagesUrl } from '@/constant';
import Image from 'next/image';
import ReservationForm from '../../_components/ReservationForm';
import { Room } from '@/types/types';

interface RoomPageDetailProps {
  params: {
    roomid: string;
  }
}

const RoomPageDetail = async ({ params }: RoomPageDetailProps) => {
  const { roomid } = params;
  const room = await getRoomDetail(roomid) as Room;

  return (
    <div className='pt-44 max-w-6xl mx-auto p-4 '>
      <div className='bgone shadow-md rounded-lg myborder overflow-hidden flex flex-col md:flex-row'>
        <div className='md:w-1/2'>
          <Carousel>
            <CarouselContent>
              {room.images?.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <Image
                    src={`${apiImagesUrl}/${room.collectionId}/${room.id}/${room.images[index]}`}
                    alt=''
                    width={1920}
                    height={1080}
                    className='h-60 w-full md:h-full object-cover'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-0' />
            <CarouselNext className='right-0' />
          </Carousel>
        </div>
        <div className='md:w-1/2 p-4'>
          <h2 className='text-2xl font-bold mb-2'>{room.room_name}</h2>
          <p>{room.type}</p>
          <div className='text-lg font-semibold '>${room.price} per night</div>
        </div>
      </div>

      <div className='bgone mt-5 rounded-lg overflow-hidden shadow-md  mb-8 myborder'>
        <ReservationForm roomid={roomid}/>
      </div>
    </div>
  )
}

export default RoomPageDetail