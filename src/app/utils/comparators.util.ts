import { User } from './../models/user.model';


export function compareUsersByFullNames(firstUser: User, secondUser: User): number {

    if (firstUser.firstName.toLowerCase() < secondUser.firstName.toLowerCase()) {
        return -1;
    } else if (firstUser.firstName.toLowerCase() > secondUser.firstName.toLowerCase()) {
        return 1;
    } else {
        if (firstUser.lastName.toLowerCase() < secondUser.lastName.toLowerCase()) {
            return -1;
        } else if (firstUser.lastName.toLowerCase() > secondUser.lastName.toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    }

}

export function compareStrings(str1: string, str2: string): number {

    if (str1.toLowerCase() < str2.toLowerCase()) {
        return -1;
    } else if (str1.toLowerCase() > str2.toLowerCase()) {
        return 1;
    } else {
        return 0;
    }

}
