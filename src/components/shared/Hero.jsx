import useLoadData from '../../hooks/useLoadData';
import useLoadDataSecure from '../../hooks/useLoadDataSecure';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

const StyledNode = styled.div`
  padding: 8px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid #E4BD00;
`;

const Hero = () => {
    const axiosSecure = useAxiosSecure();

    const [user, refetchUser] = useLoadDataSecure('/users/me', 'User');
    const [poolUsers, isLoadingUsers, refetchPoolUsers] = useLoadData('/users/poolUsers');
    const [treeRoot, setTreeRoot] = useState(1);

    if (isLoadingUsers) {
        return <span className="loading loading-bars loading-md"></span>; // Render loading indicator
    }

    const generateTreeNodes = (adminSerial) => {
        return poolUsers.filter(u => u.poolDetails.adminSerial === adminSerial).map(user => {
            return (
                <TreeNode
                    onclick={() => setTreeRoot(user.poolDetails.poolSerial)}
                    key={user.username}
                    label={<StyledNode>{user.username}</StyledNode>}
                >
                    {generateTreeNodes(user.poolDetails.poolSerial)}
                </TreeNode>
            );
        });
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
                lineColor={'green'}
                lineBorderRadius={'10px'}
                label={<StyledNode>{poolUsers?.find(u => u.poolDetails.poolSerial === treeRoot).username}</StyledNode>}
            >
                {
                    generateTreeNodes(treeRoot)
                }
            </Tree>
        </div>
    );
};

export default Hero;