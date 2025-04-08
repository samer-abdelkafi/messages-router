export interface MessageAudit {
  id: number;
  jmsId: string;
  inputDate: string;
  content: string;
  targetQueue: string;
  status:string
}
