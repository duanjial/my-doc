import React from 'react'

export default function StatusBar(props) {
    const users = props.users;

    return (
        <ul className="ul-users nav nav-pills">
            {users.map(user => (
                <li className="nav-item" key={user}>
                    <span class="user-pill nav-link active badge rounded-pill bg-light">{user}</span>
                </li>
            ))}
        </ul>
        // <div>
        //     <ul className="ul-user">
        //     {users.map((user) => (
        //         <li className="li-user" key={user}>
        //         <p>{user}</p>
        //         </li>
        //     ))}
        //     </ul>
        // </div>
    )
}
