import { ProfileTypesEnum } from './../enumerations/profile-types.enum';


export class User {

    id: string;
    email?: string;
    password?: string;
    profileType?: ProfileTypesEnum;
    firstName?: string;
    lastName?: string;
    profilePicture?: string | File;

}
