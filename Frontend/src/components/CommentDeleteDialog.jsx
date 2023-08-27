import React from 'react'
import axios from 'axios'
import Dialog from './Dialog'
import { TiInfoOutline } from 'react-icons/ti';

const CommentDeleteDialog = ({ isOpen, onClose, selectedComment, setComments, setShowAlert, comments, allComments , setAllComments, setAlertMessage }) => {
    const host = "http://localhost:5000";
    const confirmDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        axios.delete(`${host}/comments/delete/${selectedComment.id}`, {
            withCredentials: true,
        }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            }
            if (res.status == 401 || res.status == 403) navigate("/login");
            if (res.status == 404) navigate("/E404");


            const updatedItems = comments.filter(comment => comment.id !== selectedComment.id);
            setComments(updatedItems);

            const allUpdatedItems = allComments.filter(comment => comment.id !== selectedComment.id);
            setAllComments(allUpdatedItems);

            setAlertMessage('Comment removed successfully')
            setShowAlert(true)

        }).catch(err => { console.log(err); });

    };

    return (
        <div>
            <Dialog isOpen={ isOpen } onClose={ onClose }>
                <div className='flex flex-col justify-center items-start gap-4'>
                    <div className='flex flex-row justify-start items-end gap-4 text-[#7e4efc]'>
                        <TiInfoOutline className='h-8 w-8 ' />
                        <h1 className='text-xl font-semibold'>{ `Delete Comment` }</h1>
                    </div>
                    <p className='w-full flex first-letter:capitalize text-lg text-[#7e4efc]'>{ "Please confirm that you want to delete this Comment." }</p>
                    <div className='flex flex-row justify-start items-center gap-6'>
                        <div onClick={ onClose } className='hover:cursor-pointer flex flex-row gap-2 py-1 border-2 border-transparent px-4 rounded-lg justify-start items-center text-white text-lg bg-[#7e4efc]'>
                            <button className=''>Close</button>
                        </div>
                        <div onClick={ confirmDeleteDialog } className='hover:cursor-pointer flex flex-row gap-2 py-1  px-4 rounded-lg justify-start items-center text-[#7e4efc] text-lg border-[#7e4efc] border-2'>
                            <button className=''>Confirm</button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default CommentDeleteDialog