import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";
import { motion } from 'framer-motion';
import { Button } from "@material-tailwind/react";
import Dialog from './Dialog';
import AccountDialog from './AccountDialog';
import { TiInfoOutline } from 'react-icons/ti'
import { IoAddSharp } from 'react-icons/io5'
import axios from 'axios';
import Alert from './Alert';
import AccountAddDialog from './AccountAddDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import AdminTablesHeader from './AdminTablesHeader';
import Pagination from './Pagination';
import AccountDeleteDialog from './AccountDeleteDialog';
import TableSearchBar from './TableSearchBar';
import ActionsFilters from './ActionsFilters';
import AccountEditDialog from './AccountEditDialog';



const AccountsManagement = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedUser, setUser] = useState({})
    const [users, setUsers] = useState([]);
    const userColumns = ['Email', 'Fullname', 'Number of publications', 'Category', 'Admin', 'Actions'];
    const userFields = ['id', 'email', 'fullname', 'nb_publications', 'category', 'is_admin']
    const host = "http://localhost:5000";
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    const [allUsers, setAllUsers] = useState([])
    const picturesUrl = `${host}/picture/`;
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')


    const openAddDialog = (user) => {
        setIsAddDialogOpen(true);
    };

    const closeAddDialog = () => {
        setIsAddDialogOpen(false);
    };


    const openEditDialog = (user) => {
        setIsEditDialogOpen(true);
        setUser(user)
    };

    const closeEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    



    const openDeleteDialog = (user) => {
        setIsDeleteDialogOpen(true);
        setUser(user)
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    const openDialog = (user) => {
        setIsDialogOpen(true);
        setUser(user)
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            var result = await fetch(`${host}/user/all`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                const data = await fetch(`${host}/refresh`, { credentials: "include" });
                if (data.status === 401 || data.status === 403) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            } else {
                if (result.status === 200) {
                    result.json().then(json => {
                        setUsers(json);
                        setAllUsers(json)

                    });
                } else {
                    navigate("/E404");
                }
            }
        };

        fetchUsers();

    }, []);





    return (
        <motion.div
            initial={ { opacity: 0, x: -20 } }
            animate={ { opacity: 1, x: 0 } }
            exit={ { opacity: 0, x: 20 } }
            transition={ { duration: 0.5 } }
        >

            { showAlert && <Alert message={ alertMessage } onClose={ () => setShowAlert(false) } /> }

            <section className='py-14'>
                <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div class="bg-white dark:bg-gray-800 relative shadow-2xl sm:rounded-2xl overflow-hidden">
                        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <TableSearchBar tableData={ users } setTableData={ setUsers } allData={ allUsers } fields={ userFields } />
                            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button onClick={ () => { openAddDialog('') } } type="button" class="flex items-center justify-center text-white bg-[#7e4efc] hover:bg-primary-800 gap-2 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <IoAddSharp className='text-white h-5 w-5' />
                                    Add user
                                </button>
                                <AccountAddDialog
                                    isOpen={ isAddDialogOpen }
                                    onClose={ closeAddDialog }
                                    setShowAlert={ setShowAlert }
                                    setUsers={ setUsers }
                                    setAlertMessage={ setAlertMessage }
                                    setAllUsers={ setAllUsers }
                                />

                                <ActionsFilters />
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <AdminTablesHeader columns={ userColumns } />
                                <tbody>

                                    {
                                        users.slice(startIndex, endIndex).map(user => (
                                            <tr key={ user.id } class="border-b dark:border-gray-700 hover:bg-gray-50 ">
                                                <td class="w-4 p-4">
                                                    <div class="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                {/* <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ user.id }</th> */ }
                                                <td class="px-4 py-3 flex items-center font-medium text-gray-900 whitespace-nowrap">

                                                    <Tooltip
                                                        className='bg-transparent'
                                                        content={
                                                            <div className='flex flex-row justify-center items-center rounded-md'>
                                                                <img className='w-auto h-36' src={ picturesUrl + user.profile_pic } alt='' />
                                                            </div>
                                                        }
                                                        animate={ {
                                                            mount: { scale: 1, y: 0 },
                                                            unmount: { scale: 0, y: 25 },
                                                        } }
                                                    >
                                                        <img className='rounded-full w-10 h-10 mr-3' src={ picturesUrl + user.profile_pic } alt='' />

                                                    </Tooltip>
                                                    <div>{ user.email }</div>

                                                </td>
                                                <td class="px-4 py-3">{ user.fullname }</td>
                                                <td class="px-4 py-3">{ user.nb_publications }</td>
                                                <td class="px-4 py-3">{ user.category }</td>
                                                <td class="px-4 py-3">{ user.is_admin }</td>
                                                <td class="px-4 py-3 flex items-center justify-start gap-4 h-full">

                                                    <a onClick={ () => { openEditDialog(user) } } href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                    <AccountEditDialog
                                                        isOpen={ isEditDialogOpen }
                                                        onClose={ closeEditDialog }
                                                        setShowAlert={ setShowAlert }
                                                        setUsers={ setUsers }
                                                        setAlertMessage={ setAlertMessage }
                                                        setAllUsers={ setAllUsers } 
                                                        users={users}
                                                        allUsers={allUsers}
                                                        selectedUser={selectedUser}/>

                                                    <a onClick={ () => { openDeleteDialog(user) } } href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
                                                    <AccountDeleteDialog
                                                        isOpen={ isDeleteDialogOpen }
                                                        onClose={ closeDeleteDialog }
                                                        selectedUser={ selectedUser }
                                                        setShowAlert={ setShowAlert }
                                                        setUsers={ setUsers }
                                                        allUsers={ allUsers }
                                                        setAllUsers={ setAllUsers }
                                                        users={ users }
                                                        setAlertMessage={ setAlertMessage }
                                                    />
                                                    <a href="#" onClick={ () => { openDialog(user) } } class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                                    <AccountDialog user={ selectedUser } isOpen={ isDialogOpen } onClose={ closeDialog } />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Pagination totale={ users.length } currentPage={ currentPage } totalPages={ Math.ceil(users.length / itemsPerPage) } onPageChange={ setCurrentPage } />

                    </div>
                </div>
            </section>
        </motion.div>
    )
}
export default AccountsManagement