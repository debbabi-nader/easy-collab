import { MenuListItem } from './../models/menu-list-item.model';


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
        label: 'Collaboration proposals',
        icon: 'people',
        path: '/app/project-manager/collaboration-proposals'
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
        label: 'Collaboration proposals',
        icon: 'people',
        path: '/app/developer/collaboration-proposals'
    }
];

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
        label: 'Collaboration proposals',
        icon: 'people',
        path: '/app/client/collaboration-proposals'
    }
];
