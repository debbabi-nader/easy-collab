import { ProfileTypesEnum } from './../enumerations/profile-types.enum';


export class User {

    id: string;
    email?: string;
    password?: string;
    profileType?: ProfileTypesEnum;
    isActive?: boolean;
    firstName?: string;
    lastName?: string;
    profilePicture?: string | File;
    createdAt?: string;

}
