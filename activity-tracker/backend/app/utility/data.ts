import { IActivity } from "../modules/activity/activity.types";
import { IRole } from "../modules/role/role.types";
import { IStatus } from "../modules/status/status.types";

import { ActivityCategories } from "./constants";

export const roles: IRole[] = [
    { title: 'ADMIN' },
    { title: 'USER' },
];

export const status: IStatus[] = [
    { title: 'Pending', category: 'task' },
    { title: 'Complete', category: 'task' }
];

export const activities: IActivity[] = [
    { category: ActivityCategories.PROCEDURAL, subCycleNumber: 1, isOptional: true, title: `${ActivityCategories.PROCEDURAL}-101` },
    { category: ActivityCategories.PROCEDURAL, subCycleNumber: 1, isOptional: false, title: `${ActivityCategories.PROCEDURAL}-102` },
    { category: ActivityCategories.PROCEDURAL, subCycleNumber: 1, isOptional: false, title: `${ActivityCategories.PROCEDURAL}-103` },
    { category: ActivityCategories.DOCUMENTAL, subCycleNumber: 1, isOptional: false, title: `${ActivityCategories.DOCUMENTAL}-101` },
    { category: ActivityCategories.DOCUMENTAL, subCycleNumber: 1, isOptional: false, title: `${ActivityCategories.DOCUMENTAL}-102` },
    { category: ActivityCategories.DOCUMENTAL, subCycleNumber: 1, isOptional: false, title: `${ActivityCategories.DOCUMENTAL}-103` },
    { category: ActivityCategories.CLINICAL, subCycleNumber: 1, isOptional: false, title: `${ActivityCategories.CLINICAL}-101` },
    { category: ActivityCategories.CLINICAL, subCycleNumber: 1, isOptional: false, title: `${ActivityCategories.CLINICAL}-102` },
    { category: ActivityCategories.CLINICAL, subCycleNumber: 1, isOptional: false, title: `${ActivityCategories.CLINICAL}-103` },

    { category: ActivityCategories.PROCEDURAL, subCycleNumber: 2, isOptional: false, title: `${ActivityCategories.PROCEDURAL}-201` },
    { category: ActivityCategories.PROCEDURAL, subCycleNumber: 2, isOptional: false, title: `${ActivityCategories.PROCEDURAL}-202` },
    { category: ActivityCategories.PROCEDURAL, subCycleNumber: 2, isOptional: false, title: `${ActivityCategories.PROCEDURAL}-203` },
    { category: ActivityCategories.DOCUMENTAL, subCycleNumber: 2, isOptional: false, title: `${ActivityCategories.DOCUMENTAL}-201` },
    { category: ActivityCategories.DOCUMENTAL, subCycleNumber: 2, isOptional: false, title: `${ActivityCategories.DOCUMENTAL}-202` },
    { category: ActivityCategories.DOCUMENTAL, subCycleNumber: 2, isOptional: false, title: `${ActivityCategories.DOCUMENTAL}-203` },
    { category: ActivityCategories.CLINICAL, subCycleNumber: 2, isOptional: false, title: `${ActivityCategories.CLINICAL}-201` },
    { category: ActivityCategories.CLINICAL, subCycleNumber: 2, isOptional: false, title: `${ActivityCategories.CLINICAL}-202` },
    { category: ActivityCategories.CLINICAL, subCycleNumber: 2, isOptional: false, title: `${ActivityCategories.CLINICAL}-203` },

    { category: ActivityCategories.PROCEDURAL, subCycleNumber: 3, isOptional: false, title: `${ActivityCategories.PROCEDURAL}-301` },
    { category: ActivityCategories.PROCEDURAL, subCycleNumber: 3, isOptional: false, title: `${ActivityCategories.PROCEDURAL}-302` },
    { category: ActivityCategories.PROCEDURAL, subCycleNumber: 3, isOptional: false, title: `${ActivityCategories.PROCEDURAL}-303` },
    { category: ActivityCategories.DOCUMENTAL, subCycleNumber: 3, isOptional: false, title: `${ActivityCategories.DOCUMENTAL}-301` },
    { category: ActivityCategories.DOCUMENTAL, subCycleNumber: 3, isOptional: false, title: `${ActivityCategories.DOCUMENTAL}-302` },
    { category: ActivityCategories.DOCUMENTAL, subCycleNumber: 3, isOptional: false, title: `${ActivityCategories.DOCUMENTAL}-303` },
    { category: ActivityCategories.CLINICAL, subCycleNumber: 3, isOptional: false, title: `${ActivityCategories.CLINICAL}-301` },
    { category: ActivityCategories.CLINICAL, subCycleNumber: 3, isOptional: false, title: `${ActivityCategories.CLINICAL}-302` },
    { category: ActivityCategories.CLINICAL, subCycleNumber: 3, isOptional: true, title: `${ActivityCategories.CLINICAL}-303` },
];