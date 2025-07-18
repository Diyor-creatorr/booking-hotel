import { pb } from "@/lib/pocketbase";


export  const getRoomDetail= async(recordId)=> {
    try {

        const record = await pb.collection('rooms').getOne(recordId, {
            expand: 'relField1,relField2.subRelField',
        });
        return record;
        
    } catch (error) {
        console.error('Error getting slider images:', error);
        return [];
        
    }
    
}

export  const getRooms= async()=> {
    try {

        const resultList = await pb.collection('rooms').getList(1, 50, {
            filter: 'created >= "2025-01-01 00:00:00"',
        });
        return resultList.items;
        
    } catch (error) {
        console.error('Error getting slider images:', error);
        return [];
        
    }
    
}

export  const getHomeRooms= async ()=> {
    try {

        const resultList = await pb.collection('rooms').getList(1, 50, {
            filter: 'created >= "2025-01-01 00:00:00" && price ?>= "200"',
        });
        return resultList.items;
        
    } catch (error) {
        console.error('Error getting slider images:', error);
        return [];
        
    }
    
}