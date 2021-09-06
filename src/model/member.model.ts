export interface IMemberModel {
  name: string;
  email: string;
  avatar: string;
  username: string;
  id: string;
}

export interface IInviteMemberModel {
  email: string;
  status: string;
  link: string;
  id: string;
}
