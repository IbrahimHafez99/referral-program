import React from "react";
import type { AdminUser } from "@/pages/admin/dashboard/user";
type Props = {
  user: AdminUser;
};

const Tr = ({ user }: Props) => {
  return (
    <tr>
      <th>
        <label>
          <input
            type="checkbox"
            readOnly
            className="checkbox"
            checked={user.User_Roles[0].roleId === 1}
          />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm opacity-50">United States</div>
          </div>
        </div>
      </td>
      <td>
        {user.email}
        <br />
        {user.User_Roles[0].roleId === 1 && (
          <span className="badge badge-ghost badge-sm">
            ADMIN
          </span>
        )}
      </td>
      <td>{user.phoneNumber}</td>
      <th>
        <button className="btn btn-ghost btn-xs">Suspend</button>
      </th>
    </tr>
  );
};

export default Tr;
