import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';


const NavItem = [
    {
        id:0,
        title: 'Food',
        url: '/admin/food',
        icon: <AddBusinessIcon />
    },
    {
        id: 1,
        title: 'User',
        url: '/admin/user',
        icon:  <PersonIcon />
    },
    {
        id:2,
        title: 'Category',
        url: '/admin/category',
        icon: <CategoryIcon />
    },
    {
        id:3,
        title: 'Order',
        url: '/admin/order',
        icon: <BookmarkBorderIcon />
    },
]

export default NavItem;