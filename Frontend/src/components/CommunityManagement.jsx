import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";
import { motion } from 'framer-motion';
import Dialog from './Dialog';
import { TiInfoOutline } from 'react-icons/ti'
import axios from 'axios';
import { IoAddSharp } from 'react-icons/io5'
import Alert from './Alert';
import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import CommunityAddDialog from './CommunityAddDialog'
import AdminTablesHeader from './AdminTablesHeader';
import Pagination from './Pagination';
import GroupDialog from './GroupDialog';
import CommunityDeleteDialog from './CommunityDeleteDialog';
import TableSearchBar from './TableSearchBar';
import ActionsFilters from './ActionsFilters';
import CommunityEditDialog from './CommunityEditDialog';

const CommunityManagement = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [showAlert, setShowAlert] = useState(false)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [group, setGroup] = useState({});
    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    const navigate = useNavigate();
    const communityColumns = ['Id', 'Community name', 'Number of followers', 'Number of likes', 'Actions'];
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [allCommunitites, setAllCommunities] = useState([])
    const communityFields = ['id', 'community_name', 'nb_followers', 'nb_likes']
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;



    const openAddDialog = (group) => {
        setIsAddDialogOpen(true);
    };

    const closeAddDialog = () => {
        setIsAddDialogOpen(false);
    };

    const openDeleteDialog = (group) => {
        setIsDeleteDialogOpen(true);
        setGroup(group)
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    const openEditDialog = (group) => {
        setIsEditDialogOpen(true);
        setGroup(group)
    };

    const closeEditDialog = () => {
        setIsEditDialogOpen(false);
    };


    const openDialog = (selectedGroup) => {
        setIsDialogOpen(true);
        setGroup(selectedGroup)
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };


    useEffect(() => {
        const fetchCommunities = async () => {
            var result = await fetch(`${host}/communities/all`, { credentials: "include" });
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
                        setCommunities(json);
                        setAllCommunities(json)
                    });

                } else {
                    navigate("/E404");
                }
            }
        };

        fetchCommunities();

    }, []);




    return (
        <div>

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
                                <TableSearchBar tableData={ communities } allData={ allCommunitites } setTableData={ setCommunities } fields={ communityFields } />
                                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                        <button onClick={ () => { openAddDialog('') } } type="button" class="flex items-center justify-center text-white bg-[#7e4efc] hover:bg-primary-800 gap-2 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                            <IoAddSharp className='text-white h-5 w-5' />
                                            Add article
                                        </button>

                                        <CommunityAddDialog
                                            isOpen={ isAddDialogOpen }
                                            onClose={ closeAddDialog }
                                            setCommunities={ setCommunities }
                                            setAllCommunities={ setAllCommunities }
                                            setShowAlert={ setShowAlert }
                                            setAlertMessage={ setAlertMessage }
                                        />

                                        <ActionsFilters />
                                    </div>
                                </div>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <AdminTablesHeader columns={ communityColumns } />
                                    <tbody>
                                        {
                                            communities.slice(startIndex, endIndex).map((community) => (
                                                <tr key={ community.id } class="border-b dark:border-gray-700 hover:bg-gray-50 ">
                                                    <td class="w-4 p-4">
                                                        <div class="flex items-center">
                                                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                                        </div>
                                                    </td>
                                                    <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ community.id }</th>



                                                    <td class=" px-4 py-3 flex items-center font-medium text-gray-900 ">
                                                        <Tooltip
                                                            className='bg-transparent'
                                                            content={
                                                                <div className='flex flex-row justify-center items-center rounded-md'>
                                                                    <img className='w-auto h-36 rounded-lg' src={ picturesUrl + community.profile_img } alt='' />
                                                                </div>
                                                            }
                                                            animate={ {
                                                                mount: { scale: 1, y: 0 },
                                                                unmount: { scale: 0, y: 25 },
                                                            } }
                                                        >
                                                            <img className='rounded-full w-10 h-10 mr-3' src={ picturesUrl + community.profile_img } alt='' />
                                                        </Tooltip>
                                                        { community.community_name }
                                                    </td>
                                                    <td class="px-4 py-3">{ community.nb_followers }</td>
                                                    <td class="px-4 py-3">{ community.nb_likes }</td>

                                                    <td class=" px-4 py-3 flex items-center justify-start gap-4">
                                                        <a  onClick={ () => { openEditDialog(community) } } href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                        <CommunityEditDialog
                                                            group={ group }
                                                            isOpen={ isEditDialogOpen }
                                                            onClose={ closeEditDialog }
                                                            setCommunities={ setCommunities }
                                                            setAllCommunities={ setAllCommunities }
                                                            setShowAlert={ setShowAlert }
                                                            setAlertMessage={ setAlertMessage }
                                                            communities={ communities }
                                                            allCommunitites={ allCommunitites }
                                                        />


                                                        <a onClick={ () => { openDeleteDialog(community) } } href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>

                                                        <CommunityDeleteDialog
                                                            isOpen={ isDeleteDialogOpen }
                                                            onClose={ closeDeleteDialog }
                                                            group={ group }
                                                            communities={ communities }
                                                            setCommunities={ setCommunities }
                                                            allCommunitites={ allCommunitites }
                                                            setAllCommunities={ setAllCommunities }
                                                            setShowAlert={ setShowAlert }
                                                            setAlertMessage={ setAlertMessage }
                                                        />


                                                        <a href="#" onClick={ () => { openDialog(community) } } class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                                        <GroupDialog group={ group } isOpen={ isDialogOpen } onClose={ closeDialog } />



                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination totale={ communities.length } currentPage={ currentPage } totalPages={ Math.ceil(communities.length / itemsPerPage) } onPageChange={ setCurrentPage } />
                        </div>
                    </div>
                </section>
            </motion.div>
        </div>



    )
}

export default CommunityManagement