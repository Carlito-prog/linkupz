import { Document, ObjectId } from "mongoose";
import Users from "@/resources/users/users.interface"

export default interface Profile extends Users {
     id: ObjectId,
     firstName: string,
     lastName:string,
     currentLocation: string,
     radiusPreference: miles,
     favoriteTypesOfRooms: roomTypes,
     favoriteRooms: rooms,
}

enum rooms {
     basketball = 'Basketball',
     clubs = 'Clubs',
     party = 'Parties',
     videoGames = 'Video Games',
     

}

enum roomTypes {
     outdoor = "Outdoor",
     indoor = "Indoor",
     virtual = "Online"
}

enum miles {
     ten = 10,
     twenty = 20,
     thirty = 30,
     forty = 40,
     fifty = 50
}