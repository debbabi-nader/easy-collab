import { MenuListItem } from './../models/menu-list-item.model';


export const CLIENT_MAIN_MENU_LIST_ITEMS: MenuListItem[] = [
    {
        label: 'Dashboard',
        icon: 'home',
        path: '/app/client/dashboard'
    },
    {
        label: 'Projects',
        icon: 'briefcase',
        path: '/app/client/projects'
    },
    {
        label: 'Messages',
        icon: 'mail',
        path: '/app/client/chat'
    }
];

export const PROJECT_MANAGER_MAIN_MENU_LIST_ITEMS: MenuListItem[] = [
    {
        label: 'Dashboard',
        icon: 'home',
        path: '/app/project-manager/dashboard'
    },
    {
        label: 'Projects',
        icon: 'briefcase',
        path: '/app/project-manager/projects'
    },
    {
        label: 'Messages',
        icon: 'mail',
        path: '/app/project-manager/chat'
    }
];

export const DEVELOPER_MAIN_MENU_LIST_ITEMS: MenuListItem[] = [
    {
        label: 'Dashboard',
        icon: 'home',
        path: '/app/developer/dashboard'
    },
    {
        label: 'Projects',
        icon: 'briefcase',
        path: '/app/developer/projects'
    },
    {
        label: 'Messages',
        icon: 'mail',
        path: '/app/developer/chat'
    }
];
