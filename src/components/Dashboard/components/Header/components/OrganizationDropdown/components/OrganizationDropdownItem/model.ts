export interface IOrgDetails {
  name: string;
  avatar: string;
}
export interface IOrganizationDropdownItemProps {
  orgDetails: IOrgDetails;
  onClick: (e: any) => void;
}
