import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import useLoadData from '../../hooks/useLoadData';

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

const UserTree = () => {
    const [users, isLoadingUsers, refetchUsers] = useLoadData('/users');
    // console.log(users);

    if (isLoadingUsers) {
        return <div>Loading...</div>; // Render loading indicator
    }

    // Assuming A1 and A2 roles are always present
    const A1 = users.find(user => user.role === 'A1');

    return (
        <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<StyledNode>{A1?.username}</StyledNode>}
        >
            {users
                .filter(user => user.role === `A2under${A1?.username}`)
                .map((user) => (
                    <TreeNode
                        key={user.username} // Assuming user has a unique identifier like an id
                        label={<StyledNode>{user.username}</StyledNode>}
                    >
                        {users
                            .filter(u => u.role === `A3under${user.username}`)
                            .map((userChild) => (
                                <TreeNode
                                    key={userChild.username} // Assuming user has a unique identifier like an id
                                    label={<StyledNode>{userChild.username}</StyledNode>}
                                />
                            ))}
                    </TreeNode>
                ))}
        </Tree>
    );
};

export default UserTree;
