import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import useLoadData from '../../hooks/useLoadData';

const StyledNode = styled.div`
  padding: 8px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid #E4BD00;
`;

const UserTree = () => {
    const [poolUsers, isLoadingUsers, refetchUsers] = useLoadData('/users/poolUsers');
    // console.log(users);

    if (isLoadingUsers) {
        return <span className="loading loading-bars loading-md"></span>; // Render loading indicator
    }

    const generateTreeNodes = (adminSerial) => {
        return poolUsers.filter(u => u.poolDetails.adminSerial === adminSerial).map(user => {
            return (
                <TreeNode key={user.username} label={<StyledNode>{user.username}</StyledNode>}>
                    {generateTreeNodes(user.poolDetails.poolSerial)}
                </TreeNode>
            );
        });
    }

    return (
        <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<StyledNode>{poolUsers?.find(u => u.poolDetails.poolSerial === 1).username}</StyledNode>}
        >
            {
                generateTreeNodes(1)
            }
        </Tree>
    );
};

export default UserTree;
