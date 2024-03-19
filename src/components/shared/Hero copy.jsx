import useLoadData from '../../hooks/useLoadData';
import useLoadDataSecure from '../../hooks/useLoadDataSecure';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

const StyledNode = styled.button`
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    display: inline-block;
    border: 2px solid #FFD900;
    user-select: none;

    &:hover {
        background-color: #F5F5F5; 
        box-shadow: 0 0 5px 0 #FFD900;
    }
`;

const Hero = () => {
    const axiosSecure = useAxiosSecure();

    const [user, refetchUser] = useLoadDataSecure('/users/me', 'User');
    const [poolUsers, isLoadingPoolUsers, refetchPoolUsers] = useLoadData('/users/poolUsers');
    const [treeRoot, setTreeRoot] = useState(1);
    console.log(treeRoot);

    if (isLoadingPoolUsers) {
        return <span className="loading loading-bars loading-md"></span>; // Render loading indicator
    }

    const generateTreeNodes = (adminSerial) => {
        const filteredUsers = poolUsers.filter(u => u.poolDetails.adminSerial === adminSerial);

        if (filteredUsers.length === 0) {
            return null;
        }

        return filteredUsers.map(user => (
            <TreeNode
                key={user.username}
                label={
                    <StyledNode
                        onClick={() => setTreeRoot(user.poolDetails.poolSerial)}
                    >{user.username}</StyledNode>}
            >
                {generateTreeNodes(user.poolDetails.poolSerial)}
            </TreeNode>
        ));
    }


    const handleEnterPool = () => {
        axiosSecure.put('/users/enterPool')
            .then(() => {
                toast.success('Pool Enter successful!');
                refetchUser();
                refetchPoolUsers();
            }).catch((error) => {
                console.error('Error Entering Pool:', error);
                toast.error('Error Entering Pool. Please try again.');
            });
    }

    return (
        <div className=' pt-20 p-6'>
            {
                !user?.poolDetails?.poolSerial &&
                <button onClick={handleEnterPool} className="btn btn-primary block mx-auto">Enter Pool</button>
            }


            <div className="divider">Pool</div>

            <Tree
                lineWidth={'2px'}
                lineColor={'#333'}
                lineBorderRadius={'6px'}
                label={<StyledNode>{poolUsers?.find(u => u.poolDetails.poolSerial === treeRoot).username}</StyledNode>}
            >
                {
                    generateTreeNodes(treeRoot)
                }
            </Tree>
            <button onClick={() => setTreeRoot(1)} className="btn btn-primary block mx-auto mt-8">Reset</button>
        </div>
    );
};

export default Hero;