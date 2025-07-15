
import { pb } from "@/lib/pocketbase";


export  async function getHotel() {
    try {

        const record = await pb.collection('hotel').getOne('16czwlihv96e224', {
            expand: 'relField1,relField2.subRelField',
        });

        return record;
        
    } catch (error) {
        console.error('Error getting slider images:', error);
        return [];
        
    }
    
}