import React from 'react';
import Dialog from './Dialog'; // Adjust the path to match the actual path of the Dialog component
import { TiInfoOutline } from 'react-icons/ti'; // Import any required icons

const DeleteConfirmationDialog = ({ isOpen, onClose, title, content, confirmAction }) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className='flex flex-col justify-center items-start gap-4'>
                <div className='flex flex-row justify-start items-end gap-4 text-[#7e4efc]'>
                    <TiInfoOutline className='h-8 w-8 ' />
                    <h1 className='text-xl font-semibold'>{title}</h1>
                </div>
                <p className='w-full flex first-letter:capitalize text-lg text-[#7e4efc]'>{content}</p>
                <div className='flex flex-row justify-start items-center gap-6'>
                    <div onClick={onClose} className='hover:cursor-pointer flex flex-row gap-2 py-1 border-2 border-transparent px-4 rounded-lg justify-start items-center text-white text-lg bg-[#7e4efc]'>
                        <button className=''>Close</button>
                    </div>
                    <div onClick={confirmAction} className='hover:cursor-pointer flex flex-row gap-2 py-1  px-4 rounded-lg justify-start items-center text-[#7e4efc] text-lg border-[#7e4efc] border-2'>
                        <button className=''>Confirm</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
