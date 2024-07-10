"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button';
import { useState } from 'react';
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const AddPost = () => {
    const [seatOpen , setSeatOpen] = useState<boolean>(false);
    const [postState , setPostState] = useState({
        title:"",
        description:""
    })
    const [file , setFile] = useState<File | null> (null)

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setFile(file!)
    }

    const submit = () => {
        console.log(postState);
        console.log(file)

    }

    return (
        <div>
            <Sheet open={seatOpen}>
                <SheetTrigger asChild ><Button onClick={() => setSeatOpen(true)}>Add Post</Button></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add Your Amazing Work</SheetTitle>
                        <SheetDescription>
                        Add Your Amazing designing work to the world
                        </SheetDescription>
                    </SheetHeader>
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" placeholder="Enter your ui/ux title" onChange={(e) => setPostState({...postState , title:e.target.value})} />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Enter your description" onChange={(e) => setPostState({...postState , description:e.target.value})}></Textarea>
                    </div>
                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input type="file" id="image" onChange={handleFileChange} />
                    </div>
                    <SheetFooter>
                        <Button variant="default" onClick={submit}>Submit</Button>
                        <Button variant="destructive" onClick={() => setSeatOpen(false)}>Close</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AddPost;
