type AuthErrorType = {
    name?:String,
    email?:String,
    password?:String
}

type PostErrorType = {
    title? : String,
    description?:String,
    image?: String
}

interface PostType  {

    id: number,
    user_id : number,
    title: string,
    description : string,
    image : string,
    created_at : string,
    user : {
        name : string
    }
}