export interface ITeamDetails {
  name: string;
  avatar: string;
}
export interface IOrganizationDropdownItemProps {
  teamDetails: ITeamDetails;
  onClick: (e: any) => void;
}
