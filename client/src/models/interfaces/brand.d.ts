import { DateType, IPaginationParams, TDate, TId } from ".";

interface IBrandInfo {
    id: TId;
    productWebsite: string;
    brandCode: string;
    description: string;
    productName: string;
    companyName: string;
    googleAnalyticsAccount: string | null;
    titlePage: string | null;
    faviconURL: string | null;
    logoURL: string | null;
    websiteAdminTool: string | null;
    websiteAdminTool2: string | null;
    websiteAdminTool3: string | null;
    website: string;
    websiteCPanel: string | null;
    websiteProtocol: string | null;
    createdDate: TDate;
}
interface IGetListBrandsParams extends IPaginationParams {
    brandCode?: string;
}
