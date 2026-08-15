import { NavLink } from "react-router-dom";
const menuItems=[
    {
        label:"Dashboard",
        path:"/admin",
    },
    {
        label:"Sản phẩm",
        path:"/admin/products",
    },
    {
        label:"Danh mục",
        path:"/admin/categories",
    }
];
export default function AdminSidebar(){
    return(
        <aside>
            <div>
                <h2>Admin</h2>
            </div>
            <nav>
                {menuItems.map((item)
            =><NavLink
            key={item.path}
            to={item.path}
            end={item.path==="/admin"}>
                {item.label}
            </NavLink>)}
            </nav>
        </aside>
    );
}